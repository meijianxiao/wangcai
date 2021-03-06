<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import typeLists from "@/constants/typeLists";
import dayjs from 'dayjs'
import clone from "@/lib/clone";

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }

  beautify(string: string) {
    const now = dayjs()
    const day = dayjs(string)
    if (day.isSame(now, 'day')) {
      return '今天'
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日')
    } else {
      return day.format('YYYY年M月D日')
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get groupedList() {
    const {recordList} = this
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}]
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]})
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
    })
    return result
  }

  beforeCreate() {
    this.$store.commit('fetchRecords')
  }

  type = '-'
  typeList = typeLists
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: #c4c4c4;

  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}

::v-deep li.interval-tabs-item {
  height: 40px;
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>
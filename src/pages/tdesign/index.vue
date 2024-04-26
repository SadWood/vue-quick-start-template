<script lang="tsx" setup>
import type { TableProps } from 'tdesign-vue-next'

definePage({
  name: 'tdesign',
})

$message.success(`${dayjs().format('a')}好，TDesign!`)

function calculateDayOfYearPercentage(): string {
  const now = dayjs()
  const startOfYear = now.startOf('year')
  const endOfYear = now.endOf('year')
  const daysDiff = now.diff(startOfYear)
  const daysInYear = endOfYear.diff(startOfYear)
  const percentage = numbro(daysDiff).divide(daysInYear).multiply(100).format('0.00')
  return percentage
}

const percentage = calculateDayOfYearPercentage()

const statusNameListMap = {
  0: {
    label: '审批通过',
    theme: 'success',
    icon: <span class="icon-[tdesign--check-circle-filled]" />,
  },
  1: {
    label: '审批失败',
    theme: 'danger',
    icon: <span class="icon-[tdesign--close-circle-filled]" />,
  },
  2: {
    label: '审批过期',
    theme: 'warning',
    icon: <span class="icon-[tdesign--error-circle-filled]" />,
  },
}
const data: TableProps['data'] = []
const total = 5
for (let i = 0; i < total; i++) {
  data.push({
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 10, 1][i % 3],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
  })
}

const columns = ref<TableProps['columns']>([
  {
    colKey: 'applicant',
    title: '申请人',
    width: 100,
  },
  {
    colKey: 'status',
    title: '审批状态',
    width: 120,
    cell: (h, { row }) => {
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status as keyof typeof statusNameListMap].theme} variant="light-outline">
          {statusNameListMap[row.status as keyof typeof statusNameListMap].icon}
          {statusNameListMap[row.status as keyof typeof statusNameListMap].label}
        </t-tag>
      )
    },
  },
  {
    colKey: 'time',
    title: '申请耗时(天)',
    width: 120,
    align: 'center',
    // 设置单元格类名
    className: ({ row }) => {
      if (row.time >= 9)
        return 'custom-cell-class-name'

      return ''
    },
    attrs: ({ row }) => {
      if (row.time >= 9) {
        return {
          style: {
            fontWeight: 600,
            backgroundColor: 'var(--td-warning-color-light)',
          },
        }
      }
    },
  },
  {
    colKey: 'channel',
    title: '签署方式',
    width: 120,
    align: 'right',
    className: () => {
      return 'custom-cell-class-name'
    },
  },
  {
    colKey: 'detail.email',
    title: '邮箱地址',
    width: 160,
    ellipsis: true,
  },
  {
    colKey: 'createTime',
    title: '申请时间',
  },
])
const getRowClassName: TableProps['rowClassName'] = ({ rowIndex }) => {
  if (rowIndex === 2)
    return 'custom-third-class-name'

  return ''
}
</script>

<template>
  <t-layout>
    <t-aside>
      <t-menu theme="light" value="dashboard" style="margin-right: 50px" height="550px">
        <template #logo>
          <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo">
        </template>
        <t-menu-item value="dashboard">
          <template #icon>
            <t-icon name="dashboard" />
          </template>
          仪表盘
        </t-menu-item>
        <t-menu-item value="resource">
          <template #icon>
            <t-icon name="server" />
          </template>
          资源列表
        </t-menu-item>
        <t-menu-item value="root">
          <template #icon>
            <t-icon name="root-list" />
          </template>
          根目录
        </t-menu-item>
        <t-menu-item value="control-platform">
          <template #icon>
            <t-icon name="control-platform" />
          </template>
          调度平台
        </t-menu-item>
        <t-menu-item value="precise-monitor">
          <template #icon>
            <t-icon name="precise-monitor" />
          </template>
          调度平台
        </t-menu-item>
        <t-menu-item value="mail">
          <template #icon>
            <t-icon name="mail" />
          </template>
          消息区
        </t-menu-item>
        <t-menu-item value="user-circle">
          <template #icon>
            <t-icon name="user-circle" />
          </template>
          个人中心
        </t-menu-item>
        <t-menu-item value="play-circle">
          <template #icon>
            <t-icon name="play-circle" />
          </template>
          视频区
        </t-menu-item>
        <t-menu-item value="edit1">
          <template #icon>
            <t-icon name="edit-1" />
          </template>
          资源编辑
        </t-menu-item>
      </t-menu>
    </t-aside>
    <t-layout class="min-w-0">
      <t-content class="p-4">
        <div class="text-right">
          <t-badge count="100" class="ml-auto">
            <t-button>
              未读消息
            </t-button>
          </t-badge>
        </div>
        <t-divider />
        <div class="flex w-full items-center gap-x-4">
          <div>今年已过去</div>
          <t-progress class="flex-1" theme="plump" :percentage="numbro.unformat(percentage)" />
        </div>
        <t-divider />
        <t-table row-key="id" :data="data" :columns="columns" :row-class-name="getRowClassName">
          <template #footerSummary>
            <div class="flex items-center justify-center gap-x-2">
              <span class="icon-[tdesign--info-circle]" />近期申请耗时较长
            </div>
          </template>
        </t-table>
      </t-content>
    </t-layout>
  </t-layout>
</template>

<style scoped>
:deep(.t-table) {
  .custom-third-class-name > td {
    background-color: var(--td-brand-color-light);
    font-weight: bold;
  }

  td.custom-cell-class-name {
    color: orange;
    font-weight: bold;
  }
}
</style>

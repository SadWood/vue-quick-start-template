<script lang="tsx" setup>
import type { FormRules, InputValue, SubmitContext, TableProps } from 'tdesign-vue-next'

definePage({
  name: 'tdesign',
})

$message.success(`${dayjs().format('a')}好，TDesign!`)

// #region form
const FORM_RULES: FormRules<typeof formData> = {
  name: [{ required: true, message: '姓名必填', trigger: 'blur' }],
  tel: [
    {
      required: true,
      message: '手机号码必填',
      trigger: 'blur',
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '手机号码格式不正确',
      trigger: 'blur',
    },
  ],
}

const formData = reactive({
  name: '',
  tel: '',
})
const form = ref(null)

function onReset() {
  $message.success('重置成功')
}

function onSubmit(context: SubmitContext) {
  const { validateResult, firstError } = context
  if (validateResult === true) {
    $message.success('提交成功')
  }
  else {
    console.log('Validate Errors: ', firstError, validateResult)
    $message.warning(firstError ?? '')
  }
}

// 禁用 Input 组件，按下 Enter 键时，触发 submit 事件
function onEnter(_: InputValue, context: { e: KeyboardEvent }) {
  context.e.preventDefault()
}
// #endregion

// #region table
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
    icon: <span class="iconify-[tdesign--check-circle-filled]" />,
  },
  1: {
    label: '审批失败',
    theme: 'danger',
    icon: <span class="iconify-[tdesign--close-circle-filled]" />,
  },
  2: {
    label: '审批过期',
    theme: 'warning',
    icon: <span class="iconify-[tdesign--error-circle-filled]" />,
  },
}
const data: TableProps['data'] = []
const total = 5
for (let i = 0; i < total; i++) {
  // @keep-sorted
  data.push({
    applicant: ['贾明', '张三', '王芳'][i % 3],
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    status: i % 3,
    time: [2, 10, 1][i % 3],
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
// #endregion
</script>

<template>
  <t-layout>
    <t-layout class="min-w-0">
      <t-content class="p-4">
        <t-form ref="form" :rules="FORM_RULES" :data="formData" :colon="true" @reset="onReset" @submit="onSubmit">
          <t-form-item label="姓名" name="name">
            <t-input v-model="formData.name" placeholder="请输入内容" @enter="onEnter" />
          </t-form-item>
          <t-form-item label="手机号码" name="tel">
            <t-input v-model="formData.tel" placeholder="请输入内容" @enter="onEnter" />
          </t-form-item>
          <t-form-item>
            <t-space size="small">
              <t-button theme="primary" type="submit">
                提交
              </t-button>
              <t-button theme="default" variant="base" type="reset">
                重置
              </t-button>
            </t-space>
          </t-form-item>
        </t-form>
        <t-divider />
        <div class="flex w-full items-center gap-x-4">
          <div>今年已过去</div>
          <t-progress class="flex-1" theme="plump" :percentage="numbro.unformat(percentage)" />
        </div>
        <t-divider />
        <t-table row-key="id" :data="data" :columns="columns" :row-class-name="getRowClassName">
          <template #footerSummary>
            <div class="flex items-center justify-center gap-x-2">
              <span class="iconify-[tdesign--info-circle]"></span>近期申请耗时较长
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

<script lang="ts" setup>
import type { BarSeriesOption } from 'echarts/charts'
import type {
  DatasetComponentOption,
  GridComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'

use([BarChart, DatasetComponent, GridComponent])

type EChartsOption = ComposeOption<
  | DatasetComponentOption
  | GridComponentOption
  | BarSeriesOption
>

function random() {
  return Math.round(300 + Math.random() * 700) / 10
}

function getData(): EChartsOption {
  return {
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 300,
    },
    dataset: {
      dimensions: ['Product', '2015', '2016', '2017'],
      source: [
        {
          Product: 'Matcha Latte',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Milk Tea',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Cheese Cocoa',
          2015: random(),
          2016: random(),
          2017: random(),
        },
        {
          Product: 'Walnut Brownie',
          2015: random(),
          2016: random(),
          2017: random(),
        },
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
  }
}

const loading = shallowRef(false)
const loadingOptions = {
  text: 'Loading…',
  color: '#4ea397',
  maskColor: 'rgba(255, 255, 255, 0.4)',
}

const option = shallowRef<EChartsOption>(getData())
</script>

<template>
  <VChart
    :option="option"
    theme="olivia-green"
    autoresize
    :loading="loading"
    :loading-options="loadingOptions"
    class="h-96 w-full"
  />
</template>

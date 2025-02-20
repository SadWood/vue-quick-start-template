<template>
  <div
    class="relative mt-8 flex lg:mt-0 lg:pb-4 lg:pl-20 lg:pr-0 lg:pt-1.6 lg:before:absolute lg:before:bottom-[calc(50%+25px)] lg:before:left-0 lg:before:h-[calc(50%-25px)] lg:before:border-0 lg:before:border-l lg:before:border-solid lg:before:border-vue-border lg:before:content-['_'] lg:after:absolute lg:after:left-0 lg:after:top-[calc(50%+25px)] lg:after:h-[calc(50%-25px)] lg:after:border-0 lg:after:border-l lg:after:border-solid lg:after:border-vue-border lg:after:content-['_'] lg:first-of-type:before:hidden lg:last-of-type:after:hidden"
  >
    <i
      class="flex size-8 place-content-center place-items-center bg-vue-background text-vue-text lg:absolute lg:-left-6.5 lg:top-[calc(50%-25px)] lg:size-12.5 lg:rounded-lg lg:border lg:border-solid lg:border-vue-border"
    >
      <slot name="icon"></slot>
    </i>
    <div class="ml-4 flex-1">
      <h3 class="mb-1.6 text-xl font-medium text-vue-heading">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

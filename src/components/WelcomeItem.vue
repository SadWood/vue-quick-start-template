<template>
  <div
    class="relative mt-8 flex lg:mt-0 lg:pt-[0.4rem] lg:pr-0 lg:pb-4 lg:pl-[calc(var(--section-gap)/2)] lg:before:absolute lg:before:bottom-[calc(50%+25px)] lg:before:left-0 lg:before:h-[calc(50%-25px)] lg:before:border-l-1 lg:before:border-[var(--color-border)] lg:before:content-['_'] lg:after:absolute lg:after:top-[calc(50%+25px)] lg:after:left-0 lg:after:h-[calc(50%-25px)] lg:after:border-l-1 lg:after:border-[var(--color-border)] lg:after:content-['_'] lg:first-of-type:before:hidden lg:last-of-type:after:hidden"
  >
    <i
      class="flex h-8 w-8 place-content-center place-items-center bg-[var(--color-background)] text-[var(--color-text)] lg:absolute lg:top-[calc(50%-25px)] lg:left-[-26px] lg:h-[50px] lg:w-[50px] lg:rounded-lg lg:border-1 lg:border-[var(--color-border)]"
    >
      <slot name="icon" />
    </i>
    <div class="ml-4 flex-1">
      <h3 class="mb-[0.4rem] text-xl font-medium text-[var(--color-heading)]">
        <slot name="heading" />
      </h3>
      <slot />
    </div>
  </div>
</template>

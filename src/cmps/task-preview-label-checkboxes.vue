<template>
   <input name="label-toggler" :checked="checked" type="checkbox" />
</template>

<script>

export default {
   name: 'label-checkboxes',
   props: {
      checked: Boolean, required: true,
   },
}
</script>
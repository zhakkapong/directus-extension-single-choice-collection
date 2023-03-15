<template>
  <div>
    <template v-if="!view.options || view.options.length === 0">
      <v-notice type="warning">
        {{ t('relationship_not_setup') }}
      </v-notice>
    </template>

    <template v-else>
      <ul>
        <li v-for="(item, k) in view.options"
          :key="k"
          :class="{'active': checkSelectItem(item)}"
          @click="doSelectItem(item)"
          >
          <div class="label">
            <span>{{ item.text }}</span>
          </div>
          <div class="icon" v-if="item.icon">
            <v-icon :name="item.icon" :color="getActiveColor(item)"></v-icon>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@directus/extensions-sdk'
import { computed, onMounted, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

type Props = {
  value?: string
  source?: string
}

type OptionItem = {
  text: string
  value: string
  icon?: string
}

type CollectionItem = Partial<OptionItem>

const api = useApi()
const { t } = useI18n()

const $emit = defineEmits<{
  (event: 'input', value: string): void
}>()

const $props = defineProps<Props>()

const payload = reactive({
  selected: undefined as string | undefined,
})

const view = reactive({
  items: [] as CollectionItem[],
  options: computed((): OptionItem[] => {
    return view.items
      .filter((item) => item.text)
      .map((item) => ({
        text: item?.text || '',
        value: item?.value || '',
        icon: item?.icon,
      }))
  }),
})

onMounted(() => {
  fetch()
  refreshModel()
})

watch(
  () => $props.value,
  () => {
    refreshModel()
  }
)

function refreshModel() {
  if ($props.value) {
    const val = $props.value?.toString()
    payload.selected = val
  }
}

async function fetch() {
  if (!$props.source) {
    return
  }

  const collection = $props.source
  const res = await api.get<{ data: CollectionItem[] }>(`items/${collection}/?limit=-1`)
  view.items = res.data.data
}

function doSelectItem(item: OptionItem) {
  payload.selected = item.value
  $emit('input', payload.selected)
}

function checkSelectItem(item:OptionItem) {
  return payload.selected === item.value
}

function getActiveColor(item: OptionItem) {
  return checkSelectItem(item) ? 'var(--v-checkbox-color)' : null
}
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 6px;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    padding: var(--input-padding);
    border: var(--border-width) solid var(--border-normal);
    border-radius: var(--border-radius);
    justify-content: space-between;
    gap: 6px;

    &.active {
      border-color: var(--v-checkbox-color);
    }
  }
}
</style>

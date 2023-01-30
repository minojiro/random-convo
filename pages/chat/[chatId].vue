<script lang="ts" setup>
const route = useRoute();
const { chatId } = route.params
const {user,login}  = useAuth()
login()
const {sendMessage,messages,isSubmitting}  = useChat(chatId as string, computed(() => user.value?.uid || ''))
const formMessage = ref('')
const isSendable = computed(() => !!user.value && !isSubmitting.value)
const handleSubmit = async () => {
  if (!isSendable.value) return
  await sendMessage(formMessage.value)
  formMessage.value = ''
}
</script>

<template>
  <div class="max-w-lg mx-auto my-10">
    <form @submit.prevent="handleSubmit" class="flex gap-2 mb-5">
      <input type="text" class="input input-bordered flex-1" v-model="formMessage" />
      <button type="submit" class="btn btn-primary" :disabled="!isSendable">送信</button>
    </form>
    <ul>
      <li v-if="messages.length === 0">👆上のテキストボックスに「こんにちは」と入れて挨拶してみましょう！</li>
      <li v-for="message in messages" class="border-t py-5 flex">
        <p>{{ user?.uid === message.userId ? '自分' : '相手' }}：</p>
        <p class="flex-1">{{ message.text }}</p>
        <p>{{ message.createdAt.format('HH:mm:ss') }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { user, login } = useAuth()
const router = useRouter()
const { waitingUser, waitlistMe } = useMatching(computed(() => user.value?.uid || ''))

login()

watch([user], () => {
  waitlistMe()
})

watch([waitingUser], () => {
  if (waitingUser.value.roomId) {
    router.push(`/chat/${waitingUser.value.roomId}`)
  }
})

const statusMessage = computed(() => {
  if (!user.value) return '認証中'
  return 'マッチング中'
})
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div class="max-w-lg mx-auto my-10">
      <p class="flex justify-center w-full mb-5">
        <img src="../../assets/images/loading-l-7.gif" alt="" />
      </p>
      <p class="text-center mb-5 font-bold">{{ statusMessage }}</p>
    </div>
  </div>
</template>

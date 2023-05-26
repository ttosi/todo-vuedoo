// @ts-nocheck
import { reactive } from "vue";
import { ElMessage } from "element-plus";

const useNotification = reactive({
  type: "success",
  duration: 5000,
  show(message: string) {
    ElMessage({
      showClose: true,
      duration: this.duration,
      message: message,
      type: this.type as string,
      customClass: `message-error`,
    });
  },
});

export { useNotification };

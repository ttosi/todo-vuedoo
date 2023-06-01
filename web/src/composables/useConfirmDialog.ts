import { ref } from "vue";
import { ElMessageBox } from "element-plus";

const confirmTitle = ref("");
const confirmMessage = ref("");

const useShowConfirmDialog = () => {
  return ElMessageBox.confirm(confirmMessage.value, confirmTitle.value, {
    confirmButtonText: "YES",
    cancelButtonText: "NO",
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export { useShowConfirmDialog, confirmTitle, confirmMessage };

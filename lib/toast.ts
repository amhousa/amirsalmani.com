import { toast } from "sonner"

export const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "#00DC82",
      color: "black",
    },
  })
}

export const showError = (message: string) => {
  toast.error(message, {
    style: {
      background: "#ff4444",
      color: "white",
    },
  })
}


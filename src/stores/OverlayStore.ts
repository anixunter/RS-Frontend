import { defineStore } from 'pinia';
import { ref, type Ref, onUnmounted } from 'vue';
import { createShortCutKey } from 'dolphin-components';

// We may multiple overlays on top of one another
class EscapeKeyManager {
  private static instance: EscapeKeyManager;
  private modalStack: Array<() => void> = [];
  private shortcutHandler: { destroy: () => void } | null = null;

  static getInstance(): EscapeKeyManager {
    if (!EscapeKeyManager.instance) {
      EscapeKeyManager.instance = new EscapeKeyManager();
    }
    return EscapeKeyManager.instance;
  }

  addModal(closeCallback: () => void) {
    this.modalStack.push(closeCallback);

    if (this.modalStack.length === 1) {
      this.setupEscapeKey();
    }
  }

  removeModal(closeCallback: () => void) {
    const index = this.modalStack.indexOf(closeCallback);
    if (index > -1) {
      this.modalStack.splice(index, 1);
    }

    if (this.modalStack.length === 0) {
      this.cleanupEscapeKey();
    }
  }

  private setupEscapeKey() {
    if (!this.shortcutHandler) {
      this.shortcutHandler = createShortCutKey('escape', () => {
        if (this.modalStack.length > 0) {
          const topModalClose = this.modalStack[this.modalStack.length - 1];
          topModalClose();
        }
      });
    }
  }

  private cleanupEscapeKey() {
    if (this.shortcutHandler) {
      this.shortcutHandler.destroy();
      this.shortcutHandler = null;
    }
  }
}

export const createOverlayStore = (storeId: string) => {
  return defineStore(storeId, () => {
    const show = ref(false);
    const editId = ref<number | string | null>(null);
    const context = ref<Record<string, any>>({});
    const escapeManager = EscapeKeyManager.getInstance();
    let onCloseCallback: (() => void) | null = null;

    function open(options: { id?: number | string; context?: Record<string, any> } = {}) {
      editId.value = options.id ?? null;
      context.value = {
        ...context.value,
        ...(options.context || {}),
      };
      show.value = true;

      escapeManager.addModal(close);
    }

    function close() {
      if (onCloseCallback) {
        onCloseCallback();
      }

      show.value = false;
      editId.value = null;
      escapeManager.removeModal(close);
    }

    async function onSave(
      genericStore: any,
      genericAPI: any,
      fetchList: boolean = true,
      loadingRef: Ref<boolean> | null = null
    ) {
      try {
        let response = false;
        if (editId.value !== null) {
          response = await genericStore.updateItem(genericAPI, editId.value, fetchList, loadingRef);
        } else {
          response = await genericStore.createItem(genericAPI, fetchList, loadingRef);
          console.log('response', response);
        }
        if (response) close();
        return response;
      } catch (error) {
        throw error;
      }
    }

    onUnmounted(() => {
      if (show.value) {
        escapeManager.removeModal(close);
      }
    });

    function setOnCloseCallback(callback: () => void) {
      onCloseCallback = callback;
    }

    return {
      show,
      editId,
      context,
      open,
      close,
      onSave,
      setOnCloseCallback,
    };
  });
};

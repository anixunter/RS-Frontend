import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import api from '@/core/services/api';
import type { Ref } from 'vue';
import { Toast } from 'dolphin-components';

interface GenericStoreState {
  errors: Record<string, any>;
  itemList: [];
  currentItemDetail: Record<string, any>;
  payload: Record<string, any>;
  selectedItems: Record<string, any>;
}

export const createGenericStore = (storeId: string) => {
  return defineStore(storeId, {
    state: (): GenericStoreState => ({
      errors: {},
      itemList: [],
      currentItemDetail: {},
      payload: {},
      selectedItems: {},
    }),

    actions: {
      async fetchList(
        apiEndpoint: string,
        params: Record<string, any> = {},
        loadingRef: Ref<boolean> | null = null
      ): Promise<boolean> {
        this.errors = {};
        if (loadingRef) {
          loadingRef.value = true;
        }
        let response = false;
        try {
          const apiResponse = await api.get(apiEndpoint, { params });
          this.itemList = apiResponse.data.data;
          response = true;
        } catch (error: any) {
          this.errors = error?.response?.data?.errors;
          this.itemList = [];
          if (error?.response?.status == 403) {
            Toast.error(error.response.data.detail || 'You do not have the permissions to perform this action');
          }
          Toast.error(error?.response?.data?.message || 'Error Fetching List');
        } finally {
          if (loadingRef) {
            loadingRef.value = false;
          }
          return response;
        }
      },

      async fetchDetail(
        apiEndpoint: string,
        id: number | string,
        loadingRef: Ref<boolean> | null = null,
        params: Record<string, any> = {}
      ): Promise<boolean> {
        this.errors = {};
        this.currentItemDetail = {};
        if (loadingRef) loadingRef.value = true;
        let response = false;
        try {
          const apiResponse = await api.get(apiEndpoint + id + '/', { params });
          this.currentItemDetail = apiResponse.data.data;
          response = true;
        } catch (error: any) {
          this.errors = error?.response?.data?.errors;
          if (error?.response?.status == 403) {
            Toast.error(error.response.data.detail || 'You do not have the permissions to perform this action');
          }
          Toast.error(error?.response?.data?.message || 'Error Fetching Detail');
        } finally {
          if (loadingRef) loadingRef.value = false;
          return response;
        }
      },

      async createItem(
        apiEndpoint: string,
        fetchList: boolean = true,
        loadingRef: Ref<boolean> | null = null
      ): Promise<any> {
        this.errors = {};
        if (loadingRef) loadingRef.value = true;
        let response: any = false;
        try {
          response = await api.post(apiEndpoint, this.payload);
          if (fetchList) {
            await this.fetchList(apiEndpoint);
          }
          this.resetPayload();
          if (loadingRef) loadingRef.value = false;
        } catch (error: any) {
          this.errors = error?.response?.data?.errors;
          if (error?.response?.status == 403) {
            Toast.error(error.response.data.detail || 'You do not have the permissions to perform this action');
          }
          if (error?.response?.data?.message != 'Validation Error')
            Toast.error(error?.response?.data?.message || 'Error Creating Item');
        } finally {
          if (loadingRef) loadingRef.value = false;
          return response?.data?.data ?? false;
        }
      },

      async updateItem(
        apiEndpoint: string,
        id: number | string,
        fetchList: boolean = true,
        loadingRef: Ref<boolean> | null = null
      ): Promise<boolean> {
        this.errors = {};
        if (loadingRef) loadingRef.value = true;
        let response = false;
        try {
          await api.patch(apiEndpoint + id + '/', this.payload);
          response = true;
          if (fetchList) {
            await this.fetchList(apiEndpoint);
          }
          this.resetPayload();
        } catch (error: any) {
          response = false;
          this.errors = error?.response?.data?.errors;
          if (error?.response?.status == 403) {
            Toast.error(error.response.data.detail || 'You do not have the permissions to perform this action');
          }
          if (error?.response?.data?.message != 'Validation Error')
            Toast.error(error?.response?.data?.message || 'Error Updating Item');
        } finally {
          if (loadingRef) loadingRef.value = false;
          return response;
        }
      },

      async deleteItem(
        apiEndpoint: string,
        id: number | string,
        fetchList: boolean = true,
        loadingRef: Ref<boolean> | null = null
      ): Promise<boolean> {
        const result = await Swal.fire({
          title: 'Delete Confirmation',
          text: 'Are you sure you want to delete this item?',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonColor: '#004cad',
          cancelButtonColor: '#9e9e9e',
        });
        if (result.isConfirmed) {
          if (loadingRef) loadingRef.value = true;
          let response = false;
          try {
            await api.delete(apiEndpoint + id + '/');
            response = true;
            if (fetchList) {
              await this.fetchList(apiEndpoint);
            }
          } catch (error: any) {
            this.errors = error?.response?.data?.errors;
            if (error?.response?.status == 403) {
              Toast.error(error.response.data.detail || 'You do not have the permissions to perform this action');
            }
            Toast.error(error || 'Error Deleting Item');
          } finally {
            if (loadingRef) loadingRef.value = false;
            return response;
          }
        }
        return false;
      },

      resetPayload() {
        this.payload = {};
        this.errors = {};
        this.selectedItems = {};
      },
    },
  });
};

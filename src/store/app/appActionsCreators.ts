export type SetLoadingStatusACType = ReturnType<typeof setLoadingStatusAC>
export type SetErrorStatusACType = ReturnType<typeof setErrorStatusAC>
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>

export const setLoadingStatusAC = (loading: boolean) => {
  return {
    type: "APP/SET-LOADING-STATUS",
    loading
  } as const
}


export const setErrorStatusAC = (error: null | string) => {
  return {
    type: "APP/SET-ERROR-STATUS",
    error,
  } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: "APP/SET-IS-INITIALIZED",
    isInitialized
  } as const
}


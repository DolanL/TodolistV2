export type SetLoadingStatusACType = ReturnType<typeof setLoadingStatusAC>

export const setLoadingStatusAC = (loading: boolean) => {
  return {
    type: "APP/SET-LOADING-STATUS",
    loading
  } as const
}

export type SetErrorStatusACType = ReturnType<typeof setErrorStatusAC>

export const setErrorStatusAC = (error: null | string) => {
  return {
    type: "APP/SET-ERROR-STATUS",
    error,
  } as const
}


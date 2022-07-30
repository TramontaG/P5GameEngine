export type keyCallbackFn = (key: any) => any;

export type KeyCallbackMap = {
    [key: string]: keyCallbackFn
}

export type AllKeyEventsCallbackMap = {
    [key: string]: keyCallbackFn[];
}

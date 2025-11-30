"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

// 1) Form Context 생성
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

// 2) createFormHook 호출
export const { useAppForm: useCreatePostForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
});

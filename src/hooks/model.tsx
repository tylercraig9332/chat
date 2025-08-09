"use client";

import { useEffect, useRef } from "react";
import { getModelCookie } from "@/actions/model";
import { models } from "@/lib/models";
import { useModelStore } from "@/stores/model";

export const useModel = () => {
  const { setSelectedModel, ...store } = useModelStore();
  const isFirstMountRef = useRef(true);

  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      getModelCookie().then((model) => {
        setSelectedModel(models.find((m) => m.value === model)!);
      });
      return;
    }
  }, []);

  return {
    setSelectedModel,
    ...store,
  };
};

import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./spinner";

type LoadingButtonProps = {
  loading: boolean;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className="btn btn-block"
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-slate-500 inline-block">Loading...</span>
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

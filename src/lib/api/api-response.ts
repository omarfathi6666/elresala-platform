import { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export function success<T>(
  data: T,
  message = "Success",
  status = 200
) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    {
      status,
    }
  );
}

export function fail(
  message: string,
  status = 400
) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
    },
    {
      status,
    }
  );
}
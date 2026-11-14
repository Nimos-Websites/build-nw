/// <reference types="@sveltejs/kit" />

declare global {
  namespace App {
    interface Locals {
      session: any;
      user: any;
    }
  }
}

export {};

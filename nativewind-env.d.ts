/// <reference types="nativewind/types" />

// Global type declarations for React Native environment
declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

// Extend Window interface for web compatibility
declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export {};

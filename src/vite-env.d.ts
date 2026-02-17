interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_BUCKET_URL: string;
  readonly VITE_MAP_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

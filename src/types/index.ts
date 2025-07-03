export interface DataRow {
  id: number;
  raw_email: string;
  email_passwd: string;
  new_passwd: string;
  new_email: string;
  password_status: 'success' | 'error' | 'unknown' | 'processing';
  email_status: 'success' | 'error' | 'unknown' | 'processing';
  message?: string;
}

// 全局函数类型声明
declare global {
  interface Window {
    setExecuteStatus: (enabled: boolean) => void;
    updateStatus: (id: number, type: 'password' | 'email', status: DataRow['password_status'] | DataRow['email_status'], message?: string) => void;
    addData: (data: DataRow | DataRow[]) => void;
    clearData: (enabled?: boolean) => void;
    notifly: (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error') => void;
  }
}
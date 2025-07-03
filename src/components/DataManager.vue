<template>
  <div class="data-manager">
    <!-- Window Title Bar -->
    <div class="window-titlebar pywebview-drag-region">
      <div class="titlebar-content">
        <div class="titlebar-left">
          <div class="app-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <span class="app-title">数据管理中心 v1.0</span>
        </div>
        <div class="titlebar-right">
          <button class="titlebar-btn minimize-btn" @click="handleMinimize">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button class="titlebar-btn maximize-btn" @click="handleMaximize">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button class="titlebar-btn close-btn" @click="handleClose">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="title">数据管理中心</h1>
          <p class="subtitle">高效、安全的数据处理平台</p>
        </div>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-number">{{ tableData.length }}</div>
            <div class="stat-label">总记录数</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ getPasswordSuccessCount() }}</div>
            <div class="stat-label">密码成功</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ getEmailSuccessCount() }}</div>
            <div class="stat-label">邮箱成功</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Control Panel -->
    <div class="control-panel">
      <div class="control-group">
        <button 
          class="btn btn-execute"
          :class="{ 'btn-disabled': !executeEnabled }"
          :disabled="!executeEnabled"
          @click="handleExecute"
        >
          <div class="btn-content">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polygon points="5,3 19,12 5,21 5,3"></polygon>
            </svg>
            <span>开始执行</span>
          </div>
        </button>
        
        <button class="btn btn-import" @click="handleImport">
          <div class="btn-content">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>导入数据</span>
          </div>
        </button>
        
        <button class="btn btn-export" @click="handleExport">
          <div class="btn-content">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17,8 12,3 7,8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span>导出数据</span>
          </div>
        </button>
        
        <button class="btn btn-clear" @click="handleClear">
          <div class="btn-content">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>清空数据</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="table-section">
      <div class="table-container">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th class="th-id">ID</th>
                <th class="th-email">原始邮箱</th>
                <th class="th-password">邮箱密码</th>
                <th class="th-password">新密码</th>
                <th class="th-email">新邮箱</th>
                <th class="th-status">密码状态</th>
                <th class="th-status">邮箱状态</th>
                <th class="th-message">消息</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="tableData.length === 0" class="empty-row">
                <td colspan="8" class="empty-cell">
                  <div class="empty-state">
                    <div class="empty-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21,15 16,10 5,21"></polyline>
                      </svg>
                    </div>
                    <div class="empty-text">
                      <h3>暂无数据</h3>
                      <p>点击"导入数据"开始添加记录</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-for="row in tableData" :key="row.id" class="data-row">
                <td class="cell-id">
                  <span class="id-badge">{{ row.id }}</span>
                </td>
                <td class="cell-email">{{ row.raw_email }}</td>
                <td class="cell-password">{{ row.email_passwd }}</td>
                <td class="cell-password">{{ row.new_passwd }}</td>
                <td class="cell-email">{{ row.new_email }}</td>
                <td class="cell-status">
                  <div 
                    :class="getStatusClass(row.password_status)"
                    class="status-indicator"
                  >
                    <div class="status-dot"></div>
                    <span class="status-text">{{ getStatusText(row.password_status) }}</span>
                  </div>
                </td>
                <td class="cell-status">
                  <div 
                    :class="getStatusClass(row.email_status)"
                    class="status-indicator"
                  >
                    <div class="status-dot"></div>
                    <span class="status-text">{{ getStatusText(row.email_status) }}</span>
                  </div>
                </td>
                <td class="cell-message">
                  <span class="message-text">{{ row.message || '-' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Thread Count Modal -->
    <div v-if="showThreadModal" class="modal-overlay" @click="closeThreadModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">设置线程数量</h3>
          <button class="modal-close" @click="closeThreadModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="thread-input-group">
            <label for="threadCount" class="thread-label">线程数量</label>
            <input 
              id="threadCount"
              type="number" 
              v-model="threadCount" 
              min="1" 
              max="50"
              class="thread-input"
              placeholder="请输入线程数量"
            >
            <div class="thread-hint">建议范围：1-50个线程</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-modal btn-cancel" @click="closeThreadModal">取消</button>
          <button class="btn-modal btn-confirm" @click="confirmExecute">确认执行</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import type { DataRow } from '../types'

// 响应式数据
const executeEnabled = ref(true)
const tableData = ref<DataRow[]>([])
const showThreadModal = ref(false)
const threadCount = ref(10)

// 全局通知函数定义
const notifly = (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error') => {
  ElNotification({
    title,
    message,
    type
  })
}

// 全局函数定义
/**
 * 根据ID修改状态（密码状态/邮箱状态）以及设置message
 * @param id 数据ID
 * @param type 状态类型：'password' 或 'email'
 * @param status 状态值：'success' | 'error' | 'unknown' | 'processing'
 * @param message 可选的消息内容
 */
const updateStatus = (
  id: number, 
  type: 'password' | 'email', 
  status: DataRow['password_status'] | DataRow['email_status'], 
  message?: string
) => {
  const item = tableData.value.find(row => row.id === id)
  if (item) {
    if (type === 'password') {
      item.password_status = status as DataRow['password_status']
    } else if (type === 'email') {
      item.email_status = status as DataRow['email_status']
    }
    
    if (message !== undefined) {
      item.message = message
    }
    
    console.log(`已更新ID ${id} 的${type === 'password' ? '密码' : '邮箱'}状态为: ${status}${message ? `, 消息: ${message}` : ''}`)
  } else {
    console.warn(`未找到ID为 ${id} 的数据`)
  }
}

/**
 * 添加单条或多条数据
 * @param data 单条数据对象或数据数组
 */
const addData = (data: DataRow | DataRow[]) => {
  if (Array.isArray(data)) {
    tableData.value.push(...data)
    console.log(`已添加 ${data.length} 条数据`)
  } else {
    tableData.value.push(data)
    console.log(`已添加 1 条数据，ID: ${data.id}`)
  }
}

/**
 * 清空全部数据
 */
const clearData = () => {
  tableData.value = [];
}

// 内部辅助函数
const setExecuteStatus = (enabled: boolean) => {
  executeEnabled.value = enabled
}

const importData = () => {
  if ((window as any).pywebview?.api?.import_data) {
    (window as any).pywebview.api.import_data();
  }
}

// 窗口控制事件处理
const handleMinimize = () => {
  if ((window as any).pywebview?.api?.minimize) {
    (window as any).pywebview.api.minimize();
  }
}

const handleMaximize = () => {
  if ((window as any).pywebview?.api?.maximize) {
    (window as any).pywebview.api.maximize();
  }
}

const handleClose = () => {
  if ((window as any).pywebview?.api?.close) {
    (window as any).pywebview.api.close();
  }
}

// 内部事件处理
const handleExecute = () => {
  if (executeEnabled.value) {
    showThreadModal.value = true
  }
}

const closeThreadModal = () => {
  showThreadModal.value = false
}

const confirmExecute = () => {
  if (threadCount.value && threadCount.value > 0) {
    console.log(`开始执行，线程数量：${threadCount.value}`)
    showThreadModal.value = false
    // 这里可以触发实际的执行逻辑
    if ((window as any).pywebview?.api?.start) {
      (window as any).pywebview.api.start(threadCount.value);
    }
  }
}

const handleImport = () => {
  importData()
}

const handleExport = () => {
  if (tableData.value.length === 0) {
    alert('没有数据可导出')
    return
  }
  
  if ((window as any).pywebview?.api?.export_data) {
    (window as any).pywebview.api.export_data();
  }
}

const handleClear = () => {
  if (tableData.value.length === 0) {
    return
  }
  
  if ((window as any).pywebview?.api?.clear_data) {
    (window as any).pywebview.api.clear_data();
  }
}

// 辅助函数
const getPasswordSuccessCount = () => {
  return tableData.value.filter(row => row.password_status === 'success').length
}

const getEmailSuccessCount = () => {
  return tableData.value.filter(row => row.email_status === 'success').length
}

const getStatusClass = (status: DataRow['password_status'] | DataRow['email_status']) => {
  const classes = {
    unknown: 'status-unknown',
    processing: 'status-processing', 
    success: 'status-success',
    error: 'status-error'
  }
  return `status-indicator ${classes[status]}`
}

const getStatusText = (status: DataRow['password_status'] | DataRow['email_status']) => {
  const texts = {
    unknown: '未知',
    processing: '处理中',
    success: '成功',
    error: '异常'
  }
  return texts[status]
}

// 将函数暴露到全局对象
onMounted(() => {
  // 将核心函数挂载到 window 对象上
  (window as any).updateStatus = updateStatus;
  (window as any).addData = addData;
  (window as any).clearData = clearData;
  (window as any).setExecuteStatus = setExecuteStatus;
  (window as any).notifly = notifly;
  
  console.log('数据管理系统已加载，全局函数已注册')
  console.log('可用的全局函数：')
  console.log('1. updateStatus(id, type, status, message?) - 根据ID修改状态')
  console.log('   - id: 数据ID')
  console.log('   - type: "password" | "email"')
  console.log('   - status: "success" | "error" | "unknown" | "processing"')
  console.log('   - message: 可选的消息内容')
  console.log('2. addData(data) - 添加单条或多条数据')
  console.log('3. clearData() - 清空全部数据')
  console.log('4. setExecuteStatus(enabled) - 设置执行按钮状态')
  console.log('   - enabled: true/false 启用或禁用执行按钮')
  console.log('')
  console.log('使用示例：')
  console.log('updateStatus(1, "password", "success", "密码修改成功")')
  console.log('updateStatus(2, "email", "error", "邮箱已被占用")')
  console.log('addData({id: 5, raw_email: "test@example.com", ...})')
  console.log('clearData()')
  console.log('setExecuteStatus(false) // 禁用执行按钮')
  console.log('setExecuteStatus(true)  // 启用执行按钮')
})

</script>

<style scoped>
.data-manager {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
}

/* Window Title Bar Styles */
.window-titlebar {
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  border-bottom: 1px solid #1a202c;
  user-select: none;
  -webkit-app-region: drag;
}

.titlebar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 1rem;
}

.titlebar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e2e8f0;
}

.app-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #4facfe;
}

.app-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 2;
}

.app-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
}

.titlebar-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  -webkit-app-region: no-drag;
}

.titlebar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #a0aec0;
}

.titlebar-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.titlebar-btn svg {
  width: 0.875rem;
  height: 0.875rem;
  stroke-width: 2;
}

.minimize-btn:hover {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.maximize-btn:hover {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

/* Header Styles */
.header {
  margin: 2rem 2rem 2rem 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-text {
  flex: 1;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1rem;
  color: #718096;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.75rem;
  color: white;
  min-width: 80px;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.9;
}

/* Control Panel Styles */
.control-panel {
  margin: 0 2rem 2rem 2rem;
}

.control-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  background: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn-execute .btn-content {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.btn-import .btn-content {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.btn-export .btn-content {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.btn-clear .btn-content {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: #e53e3e;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Table Styles */
.table-section {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 2rem 2rem 2rem;
  height: calc(100vh - 400px);
  min-height: 300px;
  max-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

.table-container {
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  overflow-x: auto;
  overflow-y: auto;
  flex: 1;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  position: relative;
}

.data-table thead {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}

.data-table th {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1.25rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.data-row {
  transition: all 0.2s ease;
}

.data-row:hover {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  transform: scale(1.001);
}

.cell-id {
  width: 80px;
}

.id-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.cell-email {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 0.875rem;
  color: #4a5568;
}

.cell-password {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 0.875rem;
  color: #4a5568;
  max-width: 150px;
  word-break: break-all;
}

.cell-status {
  width: 120px;
}

.cell-message {
  width: 200px;
  max-width: 200px;
}

.message-text {
  font-size: 0.875rem;
  color: #4a5568;
  word-break: break-word;
  line-height: 1.4;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.status-unknown {
  background: #f7fafc;
  color: #718096;
  border: 1px solid #e2e8f0;
}

.status-unknown .status-dot {
  background: #718096;
}

.status-processing {
  background: #ebf8ff;
  color: #3182ce;
}

.status-processing .status-dot {
  background: #3182ce;
  animation: pulse 2s infinite;
}

.status-success {
  background: #f0fff4;
  color: #38a169;
}

.status-success .status-dot {
  background: #38a169;
}

.status-error {
  background: #fed7d7;
  color: #e53e3e;
}

.status-error .status-dot {
  background: #e53e3e;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.modal-close svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.modal-body {
  padding: 1.5rem;
}

.thread-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.thread-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2d3748;
}

.thread-input {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.thread-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.thread-hint {
  font-size: 0.75rem;
  color: #718096;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

.btn-modal {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-cancel:hover {
  background: #cbd5e0;
}

.btn-confirm {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
}

/* Empty State */
.empty-row {
  height: 200px;
}

.empty-cell {
  text-align: center;
  vertical-align: middle;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #a0aec0;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  stroke-width: 1.5;
}

.empty-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: #4a5568;
}

.empty-text p {
  margin: 0;
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .header-stats {
    justify-content: center;
  }
  
  .table-section {
    height: calc(100vh - 350px);
    min-height: 250px;
    max-height: calc(100vh - 150px);
  }
}

@media (max-width: 768px) {
  .data-manager {
    padding: 0;
  }
  
  .header {
    margin: 1rem;
  }
  
  .control-panel {
    margin: 0 1rem 1rem 1rem;
  }
  
  .table-section {
    margin: 0 1rem 1rem 1rem;
    height: calc(100vh - 300px);
    min-height: 200px;
    max-height: calc(100vh - 100px);
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .control-group {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-card {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .data-table {
    font-size: 0.75rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.75rem 0.5rem;
  }
  
  .cell-email {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .cell-password {
    max-width: 100px;
  }
  
  .cell-message {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .app-title {
    display: none;
  }
}
</style>
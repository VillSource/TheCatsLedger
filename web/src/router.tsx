import {
  createRouter,
  createRoute,
  createRootRoute,
  Navigate,
} from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { MyBillsPage } from './pages/MyBills'
import { BillsToPayPage } from './pages/BillsToPay'
import { CreateBillPage } from './pages/CreateBill'
import { BillDetailPage } from './pages/BillDetail'
import { SettingsPage } from './pages/Settings'

// Root route using Layout
const rootRoute = createRootRoute({
  component: Layout,
})

// Index route -> redirect to /my-bills
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to="/my-bills" replace />,
})

// My Bills Route
const myBillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-bills',
  component: MyBillsPage,
})

// Bills To Pay Route
const billsToPayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bills-to-pay',
  component: BillsToPayPage,
})

// Create Bill Route
const createBillRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create-bill',
  component: CreateBillPage,
})

// Bill Detail Route
const billDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bills/$billId',
  component: BillDetailPage,
})

// Settings / Payment Setup Route
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
})

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  myBillsRoute,
  billsToPayRoute,
  createBillRoute,
  billDetailRoute,
  settingsRoute,
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

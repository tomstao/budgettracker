"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API_BASE_URL } from "@/lib/config"
import { getAuthHeaders, mockLogin, addCacheBuster } from "@/lib/auth"

export function ApiTest() {
  const [results, setResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const testAPI = async () => {
    setIsLoading(true)
    const testResults: any = {}

    try {
      // Test login
      console.log('🔐 Testing login...')
      await mockLogin()
      testResults.login = '✅ Success'

      // Test categories
      console.log('📂 Testing categories...')
      const categoriesUrl = addCacheBuster(`${API_BASE_URL}/categories`)
      const categoriesResponse = await fetch(categoriesUrl, {
        headers: getAuthHeaders()
      })
      const categoriesData = await categoriesResponse.json()
      testResults.categories = `✅ ${categoriesData.length} items`

      // Test transactions
      console.log('💸 Testing transactions...')
      const transactionsUrl = addCacheBuster(`${API_BASE_URL}/transactions`)
      const transactionsResponse = await fetch(transactionsUrl, {
        headers: getAuthHeaders()
      })
      const transactionsData = await transactionsResponse.json()
      testResults.transactions = `✅ ${transactionsData.length} items`

      // Test budgets
      console.log('💰 Testing budgets...')
      const budgetsUrl = addCacheBuster(`${API_BASE_URL}/budgets`)
      const budgetsResponse = await fetch(budgetsUrl, {
        headers: getAuthHeaders()
      })
      const budgetsData = await budgetsResponse.json()
      testResults.budgets = `✅ ${budgetsData.length} items`

    } catch (error) {
      console.error('❌ API test failed:', error)
      testResults.error = `❌ ${error}`
    }

    setResults(testResults)
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardHeader>
        <CardTitle>🔧 API Debug Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testAPI} disabled={isLoading} className="w-full">
          {isLoading ? "Testing..." : "Test API Connection"}
        </Button>
        
        {Object.keys(results).length > 0 && (
          <div className="space-y-2 text-sm">
            <div><strong>Login:</strong> {results.login || '❌ Failed'}</div>
            <div><strong>Categories:</strong> {results.categories || '❌ Failed'}</div>
            <div><strong>Transactions:</strong> {results.transactions || '❌ Failed'}</div>
            <div><strong>Budgets:</strong> {results.budgets || '❌ Failed'}</div>
            {results.error && <div className="text-red-500"><strong>Error:</strong> {results.error}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
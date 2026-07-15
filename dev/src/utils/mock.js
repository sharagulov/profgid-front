import db from '@/fake_db/db.json'

export const MOCK_ACCESS_TOKEN = 'mock-access-token'
export const MOCK_REFRESH_TOKEN = 'mock-refresh-token'
export const MOCK_EXPIRES_AT = '2099-12-31T23:59:59Z'
export const MOCK_USER_KEY = 'mock_user'

export function isMockToken (token) {
  return token === MOCK_ACCESS_TOKEN
}

export function findDemoCredential (email, password) {
  return db.demoCredentials.find(
    c => c.email === email && c.password === password
  )
}

export function getMockAuthTokens () {
  return {
    access_token: MOCK_ACCESS_TOKEN,
    refresh_token: MOCK_REFRESH_TOKEN,
    expires_at: MOCK_EXPIRES_AT
  }
}

export function getMockUserByEmail (email) {
  const entity = db.employees.find(e => e.user.email === email)
  if (!entity) return null
  return entityToMeResponse(entity)
}

export function getDefaultMockUser () {
  return entityToMeResponse(db.employees[0])
}

export function entityToMeResponse (entity) {
  return {
    role: entity.user.role,
    user: entity.user,
    employee: entity.employee
  }
}

export function saveMockUser (user) {
  localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user))
}

export function loadMockUser () {
  try {
    const raw = localStorage.getItem(MOCK_USER_KEY)
    return raw ? JSON.parse(raw) : getDefaultMockUser()
  } catch {
    return getDefaultMockUser()
  }
}

export function clearMockUser () {
  localStorage.removeItem(MOCK_USER_KEY)
}

export async function withMockFallback (fetchFn, getMock) {
  try {
    const result = await fetchFn()
    if (result && typeof result.ok === 'boolean' && !result.ok) {
      throw new Error('API error')
    }
    if (result && typeof result.json === 'function') {
      return await result.json()
    }
    return result
  } catch (err) {
    console.warn('[mock] fallback:', err.message || err)
    return getMock()
  }
}

export function getMockEmployees () {
  return db.employees
}

export function getMockHrArticles () {
  return db.hrArticles
}

export function getMockProfessions () {
  return db.professions
}

export function getMockPositions () {
  return db.positions
}

export function getMockHrEvents () {
  return db.hrEvents
}

export function getMockHrCertifications () {
  return db.hrCertifications
}

export function getMockAdaptaciaArticles () {
  return db.adaptaciaArticles
}

export function getMockTests () {
  return db.tests
}

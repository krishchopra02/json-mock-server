const request = require('supertest')
const express = require('express')
const routes = require('../app/routes/entity')
const service = require('../app/services/entity')

const app = express()
app.use(express.json())
app.use('/api', routes)

jest.mock('../app/services/entity')

describe('Entity Routes Tests', () => {
  afterEach(() => {
    jest.clearAllMocks() // Clear all mocks after each test
  })

  describe('GET /api/posts', () => {
    test('returns an empty array if no posts exist', async () => {
      service.getAllEntities.mockResolvedValueOnce([])
      const response = await request(app).get('/api/posts')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([])
    })

    test('returns all posts if they exist', async () => {
      const samplePosts = [{ id: 1, title: 'Test Post' }]
      service.getAllEntities.mockResolvedValueOnce(samplePosts)
      const response = await request(app).get('/api/posts')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(samplePosts)
    })
  })

  describe('GET /api/posts/:id', () => {
    test('returns a post by ID if it exists', async () => {
      const postId = 1
      const samplePost = { id: postId, title: 'Test Post' }
      service.getEntityById.mockResolvedValueOnce(samplePost)
      const response = await request(app).get(`/api/posts/${postId}`)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(samplePost)
    })

    test('returns 404 for a non-existent ID', async () => {
      service.getEntityById.mockResolvedValueOnce(null)
      const response = await request(app).get('/api/posts/999')
      expect(response.statusCode).toBe(404)
    })
  })

  describe('POST /api/posts', () => {
    test('adds a new post correctly', async () => {
      const newPost = { title: 'New Post' }
      service.addEntity.mockResolvedValueOnce(newPost)
      const response = await request(app).post('/api/posts').send(newPost)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(newPost)
    })
  })

  describe('PUT /api/posts/:id', () => {
    test('updates an existing post correctly', async () => {
      const postId = 1
      const updatedPost = { title: 'Updated Post' }
      service.updateEntity.mockResolvedValueOnce(updatedPost)
      const response = await request(app)
        .put(`/api/posts/${postId}`)
        .send(updatedPost)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(updatedPost)
    })

    test('returns 500 for a non-existent ID', async () => {
      service.updateEntity.mockRejectedValueOnce(new Error('Post not found'))
      const response = await request(app)
        .put('/api/posts/999')
        .send({ title: 'Updated Post' })
      expect(response.statusCode).toBe(500)
    })
  })

  describe('DELETE /api/posts/:id', () => {
    test('deletes an existing post correctly', async () => {
      const postId = 1
      const deletedPost = { id: postId, title: 'Deleted Post' }
      service.deleteEntity.mockResolvedValueOnce(deletedPost)
      const response = await request(app).delete(`/api/posts/${postId}`)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(deletedPost)
    })

    test('returns 500 for a non-existent ID', async () => {
      service.deleteEntity.mockRejectedValueOnce(new Error('Post not found'))
      const response = await request(app).delete('/api/posts/999')
      expect(response.statusCode).toBe(500)
    })
  })
})

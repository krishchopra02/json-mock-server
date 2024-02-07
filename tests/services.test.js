const service = require('../app/services/entity')
const store = require('../app/models/store')

// Creating mock data
const sampleData = {
  posts: [
    { id: 1, title: 'Test Post', author: 'Tester', views: 10, reviews: 5 },
  ],
}

// Mock module for store.json
jest.mock('../app/models/store', () => ({
  readData: jest.fn(),
  writeData: jest.fn(),
}))

store.readData.mockResolvedValue(sampleData)
describe('Entity Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks() // Clear all mocks after each test
  })

  describe('getAllEntities', () => {
    test('returns all entities', async () => {
      const result = await service.getAllEntities('posts')
      expect(result).toEqual(sampleData.posts)
    })

    test('return empty array when no entities', async () => {
      store.readData.mockResolvedValue({})
      const result = await service.getAllEntities('posts')
      expect(result).toEqual([])
    })
  })

  describe('getEntityById', () => {
    test('returns the correct entity by ID', async () => {
      store.readData.mockResolvedValue(sampleData)
      const postId = 1
      const result = await service.getEntityById('posts', postId)
      expect(result).toEqual(sampleData.posts.find((post) => post.id == postId))
    })
    test('returns undefined for a non-existent ID', async () => {
      const nonExistentId = 999
      const result = await service.getEntityById('posts', nonExistentId)
      expect(result).toBeUndefined()
    })
    test('returns undefined for a non-existent entity', async () => {
      const entityId = 1
      const result = await service.getEntityById('nonExistentEntity', entityId)
      expect(result).toBeUndefined()
    })
  })

  describe('addEntity', () => {
    test('adds a new entity ', async () => {
      const newPost = {
        title: 'New Post',
        author: 'New Author',
        views: 20,
        reviews: 3,
      }
      const result = await service.addEntity('posts', newPost)
      expect(result).toMatchObject(newPost)
      expect(store.writeData).toHaveBeenCalled()
    })
  })

  describe('updateEntity', () => {
    test('updates an existing entity', async () => {
      const postId = 1
      const updatedPost = { title: 'Updated Post' }
      const result = await service.updateEntity('posts', postId, updatedPost)
      expect(result.title).toBe(updatedPost.title)
      expect(store.writeData).toHaveBeenCalled()
    })

    test('throws an error for a non-existent ID', async () => {
      const nonExistentId = 999
      await expect(
        service.updateEntity('posts', nonExistentId, {})
      ).rejects.toThrowError()
    })

    test('throws an error if the ID is mutated', async () => {
      const postId = 1
      const updatedPost = { ...sampleData.posts[0], id: 999 } // Mutate the ID
      await expect(
        service.updateEntity('posts', postId, updatedPost)
      ).rejects.toThrowError()
    })
  })

  describe('deleteEntity', () => {
    test('deletes an existing entity', async () => {
      const sampleData = {
        posts: [
          {
            id: 1,
            title: 'Test Post',
            author: 'Tester',
            views: 10,
            reviews: 5,
          },
        ],
      }

      store.readData.mockResolvedValue(sampleData)
      const postId = 1
      const result = await service.deleteEntity('posts', postId)
      expect(result).toEqual(sampleData.posts[0])
      expect(store.writeData).toHaveBeenCalled()
    })

    test('throws an error for a non-existent ID', async () => {
      const nonExistentId = 999
      await expect(
        service.deleteEntity('posts', nonExistentId)
      ).rejects.toThrowError()
    })
  })
})

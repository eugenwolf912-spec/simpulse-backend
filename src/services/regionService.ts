import { AppError } from '../utils/AppError'

export class RegionService {
  normalizeForStorage(region: string): string {
    const normalized = region.trim()
    if (!normalized) {
      throw new AppError('Region is required and must match Second Life region name exactly', 400)
    }
    return normalized
  }
}

export const regionService = new RegionService()

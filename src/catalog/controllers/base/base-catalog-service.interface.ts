// This interface is designed only to define methods used in a standard controller.
// It doesn't have to be implemented by actual services.
// Moreover, the global interceptor will convert any return type to Observable.
export interface BaseCatalogService {
  create(dto: Record<string, any>, owner?: unknown): any;

  findAll(populate?: string): any;

  findOne(id: string, populate?: string): any;

  update(id: string, dto: Record<string, any>): any;

  remove(id: string): any;
}

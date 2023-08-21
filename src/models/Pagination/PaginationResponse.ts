export interface PaginationResponse<T> {
  /**
   * A list of named API resources.
   */
  items: T[];
  /**
   * Total number of pages available with a certain number of elements per page
   */
  totalPages: number;
  /**
   * Items from which the received items start
   */
  itemsFrom: number;
  /**
   * Items from which the received items end
   */
  itemsTo: number;
  /**
   * Total number of all available items
   */
  totalItemsCount: number;
}

function Stack() {
  this._item = [];
  this._size = 0;
}

/**
 * Pushes an item onto the top of the stack.
 */
Stack.prototype.push = function (item) {
  this._item[this._size] = item;
  this._size += 1;
  return this._size;
};

/**
 * Remove an item at the top of the stack.
 */
Stack.prototype.pop = function () {
  if (this._size === 0) return undefined;

  const top = this._item[this._size - 1];
  this._item.length = this._size - 1;
  this._size -= 1;

  return top;
};

/**
 * Determines if the stack is empty.
 */
Stack.prototype.isEmpty = function () {
  return this._size === 0;
};

/**
 * Returns the item at the top without removing it.
 */
Stack.prototype.peek = function () {
  if (this._size === 0) return undefined;
  return this._item[this._size - 1];
};

/**
 * Returns the number of items in the stack.
 */
Stack.prototype.length = function () {
  return this._size;
};

export default Stack;

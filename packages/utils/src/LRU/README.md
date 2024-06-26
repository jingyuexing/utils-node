## LRU

当一个数据项被访问时，LRU缓存会将其移动到缓存的前面，表示它是最近被访问的数据项。当缓存达到容量限制时，LRU缓存会淘汰最久未被访问的数据项，以腾出空间给新的数据使用。

具体来说，LRU缓存通常使用一个双向链表和一个哈希表来实现。双向链表记录数据项的访问顺序，链表头部存放的是最近被访问的数据项，链表尾部存放的是最久未被访问的数据项。哈希表用来快速定位数据项在链表中的位置。

当一个数据项被访问时，如果它已经在缓存中，LRU缓存会将其从链表中删除，并将其插入到链表头部，表示它是最近被访问的数据项。如果它不在缓存中，LRU缓存会将其插入到链表头部，并将其加入到哈希表中。如果缓存已经达到容量限制，LRU缓存会删除链表尾部的数据项，并从哈希表中删除对应的记录。

当需要淘汰数据项时，LRU缓存会删除链表尾部的数据项，因为链表尾部的数据项是最久未被访问的。这种淘汰策略可以使得缓存中保留最近被访问的数据项，从而提高缓存的命中率。

import type { IEntity } from "@/models/Entity";

const getObjectsFromJson = <T extends IEntity>(type: { new (): T }, data: T[]): T[] => {
  return data.map((d) => {
    return new type().create(d);
  });
};

export { getObjectsFromJson };

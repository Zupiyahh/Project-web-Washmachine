export const getOffset = (page: number, limit: number): number => {
    const offset = ((page || 1) -1) * (limit || 0);
    return offset;
}

export type TypeByPath<Type, Path extends string> =
    unknown extends Type
        ? string
        : Type extends any[]
            ? TypeByPath<Type[number], Path>
            : Path extends `${infer ParentPath}.${infer ChildPath}`
                ? ParentPath extends keyof Type
                    ? TypeByPath<Type[ParentPath], ChildPath>
                    : never
                : Path extends keyof Type
                    ? Type[Path]
                    : never
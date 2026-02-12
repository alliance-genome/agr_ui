export type TypeOrArrayType<Type> = Type extends (infer ArrayType)[] ? ArrayType : Type;

export type IsArrayOfObjectsType<Type> =
    Type extends (infer ArrayType)[]
        ? ArrayType extends (infer SubArrayType)[]
            ? IsArrayOfObjectsType<SubArrayType>
            : ArrayType extends object
                ? true
                : false
        : false

export type OnlyArrayOfObjects<Type> =
    Type extends (infer ArrayType)[]
        ? OnlyArrayOfObjects<ArrayType>
        : {
            [Key in keyof Type as (IsArrayOfObjectsType<Type[Key]> extends true ? Key : never)]: Type[Key]
        };

export type OnlyNonArrayOfObjects<Type> =
    Type extends (infer ArrayType)[]
        ? OnlyNonArrayOfObjects<ArrayType>
        : {
            [Key in keyof Type as (IsArrayOfObjectsType<Type[Key]> extends false ? Key : never)]: Type[Key]
        };

import React from "react";
import WPAPI from "wpapi";

interface ICategory {
    id: number;
    name: string;
    slug: string;
    link: string;
}

const useCategories = () => {
    const [categories, setCategories] = React.useState<ICategory[]>([]);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        const wp = new WPAPI({ endpoint: 'https://www.historiadealagoas.com.br/wp-json' });

        wp.categories().then((categories: ICategory[]) => {
            setCategories(categories);
        }).catch((err: Error) => {
            setError(err);
        });
    }, []);

    return { categories, error };
};

export default useCategories;
import AppModal from "../components/ui/AppModal";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import AppTable from "../components/ui/AppTable";
import { User } from "../types/common";
import { useDeleteUserMutation, useEditUserMutation, useGetManagersQuery } from "../redux/features/user/userApi";

const ManageManager = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const queryString = useMemo(() => {
        const info = {
            limit: 10,
            page,
            searchTerm: search.length ? search : undefined,
        };
        const queryString = Object.keys(info).reduce((pre, key: string) => {
            const value = info[key as keyof typeof info];
            if (value) {
                return pre + `${pre.length ? "&" : ""}${key}=${value}`;
            }
            return pre;
        }, "");
        return queryString;
    }, [page, search]);

    const infoQuery = useGetManagersQuery(queryString);

    const [deleteUser, { isError, error, isLoading, isSuccess }] = useDeleteUserMutation();
    const [updateUser] = useEditUserMutation();

    const handleUserRoleChange = async (id: string) => {
        const updateData = {
            id, role: "seller"
        }

        await updateUser(updateData).unwrap().then(res => {
            if (!res.success) {
                toast.error("Change User role unsuccessful!", { toastId: 1 })
            }
            toast.success("Change User role successful!", { toastId: 1 })
        }).catch(res => {
            if (!res.success) {
                toast.error("Change User role unsuccessful!", { toastId: 1 })
            }
        });
    }

    useEffect(() => {
        if (isError) {
            toast.error("User delete unsuccessful!");
        } else if (!isLoading && isSuccess) {
            toast.success('User deleted Successful!')
        }
    }, [isError, error, isLoading, isSuccess])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            className: "min-w-[150px]",
            render: (name: string) => {
                return (
                    <div className='flex items-center gap-1'>
                        <p className="cursor-pointer">{name}</p>
                    </div>
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: "min-w-[150px]",
        },
        {
            title: 'Role',
            dataIndex: 'role',
            className: "min-w-[145px]",
            render: (_role: string, record: User) => {
                return (
                    <div className=''>
                        <AppModal button={
                            <button className="text-xs text-white px-4 py-1 rounded-full bg-primary">Make Seller</button>}
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Make Seller"
                            primaryButtonAction={() => handleUserRoleChange(record?._id)}
                        >
                            <div className='max-w-80'>
                                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure Make Seller <span className="text-textDark font-medium">{record?.name}</span> from Seller list?</p>
                            </div>
                        </AppModal>
                    </div>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            className: "min-w-[145px]",
            render: (_text: string, record: User) => {
                return (
                    <div className=''>
                        <AppModal button={
                            <button className="text-xs text-white px-4 py-1 rounded-full bg-bgred">Remove</button>}
                            cancelButtonTitle="No, Don’t"
                            primaryButtonTitle="Yes. Remove"
                            primaryButtonAction={() => deleteUser(record?._id)}
                        >
                            <div className='max-w-80'>
                                <p className="text-center text-[#828282] pt-4 text-lg">Are you sure  Remove <span className="text-textDark font-medium">{record?.name}</span> from the user list?</p>
                            </div>
                        </AppModal>
                    </div>
                )
            }
        },
    ];

    return (
        <AppTable
            columns={columns}
            infoQuery={infoQuery}
            onInputChange={(text) => setSearch(text)}
            setPage={setPage}
            headerText="Sellers List"
            inputPlaceholder="Search Seller"
        />
    );
};

export default ManageManager;
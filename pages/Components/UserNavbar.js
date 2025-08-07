import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserNavbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [dataStore, setDataStore] = useState();
  const [data, setData] = useState();
  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored === null) {
      router.push("/auth/login");
      return;
    }
    setDataStore(stored ? JSON.parse(stored) : null);
  }, []);
  useEffect(() => {
    if (dataStore === undefined) return;
    setData(dataStore.data);
  }, [dataStore]);
  useEffect(() => {
    if (data === undefined) return;
    if (data.userLevelJoin.level_name === "พี่เลี้ยง") {
      navigation.push([])
      navigation.push(
        { name: "Dashboard", href: "/", current: false, key: "item-1" },
        {
          name: "คู่มือการใช้งาน",
          href: "https://drive.google.com/file/d/1QLEe48O3UqeVtivaWuorwaAsFk3GQdXQ/view?usp=drive_link",
          key: "item-2",
        }
      );
    } else {
      navigation.push([])
      navigation.push(
        { name: "Dashboard", href: "/", current: false, key: "item-1" },
        {
          name: "ระบบสหกิจศึกษา",
          href: "/users",
          current: false,
          key: "item-2",
        },
        { name: "ระบบเตรียมฝึก", href: "/", current: false, key: "item-3" },
        {
          name: "คู่มือการใช้งาน",
          href: "https://drive.google.com/file/d/1DjVOY9BkdRPm3jU94lIJgZ3_YMdJkeZG/view?usp=drive_link",
          key: "item-4",
        },
      );
    }
    setIsLogin(true);
  }, [data]);
  const logout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };
  const ToProfile = () => {
    router.push({
      pathname: "/profile",
      query: {
        uuid: data.uuid,
      },
    });
  };
  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r  from-rose-600  via-red-400 to-pink-500 ... sticky"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/logo.png"

                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/logo.png"

                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-white hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          data?.profile_image
                            ? `${process.env.NEXT_PUBLIC_API_URL}api/${data.profile_image}`
                            : `../icon/avatar.jpg`
                        }
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href={"#"}
                            onClick={ToProfile}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            href={"#"}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

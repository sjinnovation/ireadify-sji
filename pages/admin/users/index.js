import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports'
import React, { useState, useEffect } from 'react'
import Layout from '../../../components/admin/layout/Layout';
import Spinner from "../../../components/admin/Spinner";
import moment from 'moment';

Amplify.configure(awsconfig);

const index = () => {

  const [usersList, setUsersList] = useState()
  const [allUsers, setAllUsers] = useState()
  const [isLoading, setLoading] = useState(true)
  const [keywordValue, setkeyWordValue] = useState("")
  const [searchCancelButton, setSearchCancelButton] = useState(false)
  const [hideLoadMore, setHideLoadMore] = useState(false)
  const [sliceUsers, setSliceUsers] = useState(10)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    listUsers()
  }, [])

  let listUsers = async () => {
    setLoading(true)
    let nextToken
    let apiName = 'AdminQueries';
    let path = '/listUsers';
    let myInit = {
      queryStringParameters: {
        "token": nextToken,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    const { NextToken, ...response } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    var allUsersList = response.Users
    setTotalUsers(allUsersList.length)
    if (allUsersList != null) {
      setUsersList(allUsersList)
      setAllUsers(allUsersList)
    }
    setLoading(false)
  }

  let onLoadMore = () => {
    if (sliceUsers < totalUsers) {
      var totalOnScreen = sliceUsers + 5;
      setSliceUsers(totalOnScreen)
    }
    else {
      setHideLoadMore(true)
    }
  }

  let disableUser = async (Username) => {
    let apiName = 'AdminQueries';
    let path = '/disableUser';
    let myInit = {
      body: {
        "username": Username,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    return await API.post(apiName, path, myInit) && listUsers();
  }

  let enableUser = async (Username) => {
    let apiName = 'AdminQueries';
    let path = '/enableUser';
    let myInit = {
      body: {
        "username": Username,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    return await API.post(apiName, path, myInit) && listUsers();
  }

  let confirmUserSignUp = async (Username) => {
    let apiName = 'AdminQueries';
    let path = '/confirmUserSignUp';
    let myInit = {
      body: {
        "username": Username,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    return await API.post(apiName, path, myInit) && listUsers();
  }

  let getUser = async () => {
    let apiName = 'AdminQueries';
    let path = '/getUser';
    let myInit = {
      body: {
        "username": Username
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    }
    return await API.get(apiName, path, myInit);
  }

  let searchUsers = async (e) => {
    setkeyWordValue(e.target.value.trim())
    var searchUser = allUsers
    searchUser = searchUser.filter((item) => {
      let name = item.Attributes[4].Value + item.Attributes[2].Value + item.Attributes[6].Value
      return name.toLowerCase().indexOf(
        keywordValue.trim().toLowerCase()) !== -1
    })
    setUsersList(searchUser)
    setSearchCancelButton(true)
  }

  const cancelSearch = () => {
    setkeyWordValue("");
    setSearchCancelButton(false)
    listUsers(null)
  }

  return (
    <Layout>
      <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
        <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
          <div className="p-4">
            <div className="bg-white flex border-solid border-black items-center rounded-full shadow-xl">
              <input className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" name="keyword" value={keywordValue} onChange={(e) => searchUsers(e)} type="text" placeholder="Search by first name, last name & email" />
              {keywordValue === "" ? null
                :
                searchCancelButton ?
                  <button onClick={cancelSearch} className="bg-red-500 text-white  py-2 px-4 mr-8 hover:bg-red-400 focus:outline-none  flex items-center justify-center">
                    Cancel
                      </button>
                  : null
              }
            </div>
          </div>

          <div className="bg-blue-500 text-white text-bold px-2 py-3 border-solid border-gray-200 border-b">
            List Users
          </div>
          <div className="p-3">
            {
              isLoading ? <Spinner /> :
                <table className="w-full rounded">
                  <thead>
                    <tr>
                      <th className="border px-1 py-2">First Name</th>
                      <th className="border px-1 py-2">Last Name</th>
                      <th className="border px-1 py-2">Email</th>
                      <th className="border px-1 py-2">Verified</th>
                      <th className="border px-1 py-2">Enabled</th>
                      <th className="border px-1 py-2">Status</th>
                      <th className="border px-1 py-2">Last Login</th>
                      <th className="border px-1 py-2">Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      usersList.slice(0, sliceUsers).map((item) => {
                        return <tr key={item.Username} className="text-center" >
                          <td className="border px-1 py-2">{item.Attributes[4].Value}</td>
                          <td className="border px-1 py-2">{item.Attributes[2].Value}</td>
                          <td className="border px-1 py-2">{item.Attributes[6].Value}</td>
                          <td className="border px-1 py-2">
                            {item.Attributes[3].Value === "true" ? 
                              <svg className="text-green-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg> :
                              <svg className="text-red-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            }
                          </td>
                          <td title="Click to enable/disable" className="border px-1 py-2">
                            {item.Enabled ?
                              <svg onClick={() => disableUser(item.Username)} className="cursor-pointer text-green-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg> :
                              <svg onClick={() => enableUser(item.Username)} className="cursor-pointer text-red-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            }
                          </td>
                          <td className="border px-1 py-2">
                            {item.Enabled ?
                              item.UserStatus === "CONFIRMED" ?
                                <svg className="text-green-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg> :
                                <svg onClick={() => confirmUserSignUp(item.Username)} className="cursor-pointer text-red-500 block m-auto w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              :
                              null
                            }
                          </td>
                          <td className="border px-1 py-2">
                            {moment(item.Attributes[5].Value).format('L')}<br></br>{moment(item.Attributes[5].Value).format('LTS')}
                          </td>
                          <td className="border px-1 py-2">
                            {moment(item.UserCreateDate).format('L')}<br></br>{moment(item.UserCreateDate).format('LTS')}
                          </td>
                        </tr>
                      })}
                  </tbody>
                </table>
            }
            {
              !hideLoadMore ?
                <button onClick={onLoadMore} className="cursor-pointer bg-blue-500 text-white mt-4  py-2 px-1 mr-1 hover:bg-blue-400 focus:outline-none  flex items-center justify-center">
                  Load more
                </button>
                :
                null
            }
          </div>
        </div>
      </div>
    </Layout>
  );

}

export default index
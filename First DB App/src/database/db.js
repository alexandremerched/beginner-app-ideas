class Customer {
    constructor(dbName) {
        this.dbName = dbName
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB. \
          Such and such feature will not be available.")
        }
    }

    /**
     * Remove all rows from the database
     * @memberof Customer
     */
    removeAllRows = () => {
        const request = indexedDB.open(this.dbName, 1)

        request.onerror = (event) => {
            showInLog(`Database error: ${event.target.error.code} - ${event.target.error.message}`)
        }

        request.onsuccess = (event) => {
            showInLog('Deleting all customers...')
            const db = event.target.result
            const txn = db.transaction('customers', 'readwrite')
            txn.onerror = (event) => {
                showInLog(`Database error: ${event.target.error.code} - ${event.target.error.message}`)
            }
            txn.oncomplete = () => {
                showInLog('All rows removed!')
            }
            const objectStore = txn.objectStore('customers')
            const getAllKeysRequest = objectStore.getAllKeys()
            getAllKeysRequest.onsuccess = (event) => {
                getAllKeysRequest.result.forEach(key => {
                    objectStore.delete(key)
                })
            }
        }

        buttonClearDB.disabled = false
    }

    /**
     * Populate the Customer database with an initial set of customer data
     * @param {[object]} customerData Data to add
     * @memberof Customer
     */
    initialLoad = (customerData) => {
        const request = indexedDB.open(this.dbName, 1)

        request.onerror = (event) => {
            showInLog(`Database error: ${event.target.error.code} - ${event.target.error.message}`)
        }

        request.onupgradeneeded = (event) => {
            showInLog('Populating customers...')
            const db = event.target.result
            const objectStore = db.createObjectStore('customers', { keyPath: 'userid' })

            objectStore.onerror = (event) => {
                showInLog(`Database error: ${event.target.error.code} - ${event.target.error.message}`)
            }

            // Create an index to search customers by name and email
            objectStore.createIndex('name', 'name', { unique: false })
            objectStore.createIndex('email', 'email', { unique: true })

            // Populate the database with the initial set of rows
            customerData.forEach(function (customer) {
                objectStore.put(customer)
            })

            db.close()
        }

        buttonLoadDB.disabled = false
    }

    queryAllRows = () => {
        const request = indexedDB.open(this.dbName, 1)

        request.onerror = (event) => {
            showInLog(`Database error: ${event.target.error.code} - ${event.target.error.message}`)
        }

        request.onsuccess = (event) => {
            showInLog('Displaying customers...')
            const db = event.target.result
            const transaction = db.transaction('customers', 'readonly')
            const objectStore = transaction.objectStore('customers')

            const myIndex = objectStore.index('name')
            myIndex.openCursor().onsuccess = event => {
                const cursor = event.target.result

                if (cursor === null) {
                    showInLog('No rows to display')

                    return
                }

                if (cursor) {
                    let { value: { email, name, userid } } = cursor
                    showInQuery(email, name, userid)

                    cursor.continue()
                } else {
                    showInLog('All rows are displayed with sucessfully')
                }
            }

            buttonLoadDB.disabled = false
        }
    }
}

// Web page event handlers
const DBNAME = 'customer_db'

/**
 * Clear all customer data from the database
 */
const clearDB = () => {
    showInLog('Delete all rows from the Customers database')

    let customer = new Customer(DBNAME)

    buttonClearDB.disabled = true

    customer.removeAllRows()
}

/**
 * Add customer data to the database
 */
const loadDB = async () => {
    showInLog('Load the Customers database')

    // Customers to add to initially populate the database with
    const customerData = [
        { userid: '444', name: 'Bill', email: 'bill@company.com' },
        { userid: '555', name: 'Donna', email: 'donna@home.org' }
    ]

    let customer = new Customer(DBNAME)

    buttonLoadDB.disabled = true

    customer.initialLoad(customerData)
}

const queryDB = () => {
    showInLog('Query the Customers database')

    let customer = new Customer(DBNAME)

    buttonLoadDB.disabled = true

    customer.queryAllRows()
}
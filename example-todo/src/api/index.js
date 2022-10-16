import { Client as Appwrite, Databases, Account, Permission, Role } from 'appwrite';
import { Server } from '../utils/config';

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);

    api.sdk = { database, account };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createDocument: (data) => {
    return api
      .provider()
      .database.createDocument(Server.database, Server.collectionID, 'unique()', data)
  },

  listDocuments: () => {
    return api.provider().database.listDocuments(Server.database,Server.collectionID);
  },

  updateDocument: (documentId, data) => {
    return api
      .provider()
      .database.updateDocument(Server.database,Server.collectionID, documentId, data);
  },

  deleteDocument: (documentId) => {
    return api.provider().database.deleteDocument(Server.database,Server.collectionID, documentId);
  },
};

export default api;

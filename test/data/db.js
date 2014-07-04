module.exports = {
    users: [{
        userName: 'Pau',
        email: 'pau@pau.com',
        password: 'password',
        isAdmin: 'true'
    },{
        userName: 'Seal',
        email: 'seal@seal.com',
        password: 'password',
        isAdmin: 'false'
    },{
        userName: 'Goeff',
        email: 'goeff@goeff.com',
        password: 'password',
        isAdmin: 'false'
    }],
    
    devices: [{
            guid: '00000000-0000-0000-0000-000000000000',
            imei: '212345678912345'
        },{
            guid: '00000000-0000-0000-0000-000000000001',
        	imei: '112345678912345'            
        },{
            guid: '00000000-0000-0000-0000-000000000002',
            imei: '012345678912345'
    }],

    qrcodes: [{
            code: '00000000-0000-0000-0000-000000000000',
            humanId: 'UK00000'
        },{
            code: '00000000-0000-0000-0000-000000000001',
            humanId: 'UK00001'
        },{
            code: '00000000-0000-0000-0000-000000000002',
            humanId: 'UK00002'
    }]
};
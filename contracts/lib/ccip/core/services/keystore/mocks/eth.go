// Code generated by mockery v2.43.2. DO NOT EDIT.

package mocks

import (
	context "context"
	big "math/big"

	common "github.com/ethereum/go-ethereum/common"

	ethkey "github.com/smartcontractkit/chainlink/v2/core/services/keystore/keys/ethkey"

	mock "github.com/stretchr/testify/mock"

	types "github.com/ethereum/go-ethereum/core/types"
)

// Eth is an autogenerated mock type for the Eth type
type Eth struct {
	mock.Mock
}

type Eth_Expecter struct {
	mock *mock.Mock
}

func (_m *Eth) EXPECT() *Eth_Expecter {
	return &Eth_Expecter{mock: &_m.Mock}
}

// Add provides a mock function with given fields: ctx, address, chainID
func (_m *Eth) Add(ctx context.Context, address common.Address, chainID *big.Int) error {
	ret := _m.Called(ctx, address, chainID)

	if len(ret) == 0 {
		panic("no return value specified for Add")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, *big.Int) error); ok {
		r0 = rf(ctx, address, chainID)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Eth_Add_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Add'
type Eth_Add_Call struct {
	*mock.Call
}

// Add is a helper method to define mock.On call
//   - ctx context.Context
//   - address common.Address
//   - chainID *big.Int
func (_e *Eth_Expecter) Add(ctx interface{}, address interface{}, chainID interface{}) *Eth_Add_Call {
	return &Eth_Add_Call{Call: _e.mock.On("Add", ctx, address, chainID)}
}

func (_c *Eth_Add_Call) Run(run func(ctx context.Context, address common.Address, chainID *big.Int)) *Eth_Add_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(common.Address), args[2].(*big.Int))
	})
	return _c
}

func (_c *Eth_Add_Call) Return(_a0 error) *Eth_Add_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Eth_Add_Call) RunAndReturn(run func(context.Context, common.Address, *big.Int) error) *Eth_Add_Call {
	_c.Call.Return(run)
	return _c
}

// CheckEnabled provides a mock function with given fields: ctx, address, chainID
func (_m *Eth) CheckEnabled(ctx context.Context, address common.Address, chainID *big.Int) error {
	ret := _m.Called(ctx, address, chainID)

	if len(ret) == 0 {
		panic("no return value specified for CheckEnabled")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, *big.Int) error); ok {
		r0 = rf(ctx, address, chainID)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Eth_CheckEnabled_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'CheckEnabled'
type Eth_CheckEnabled_Call struct {
	*mock.Call
}

// CheckEnabled is a helper method to define mock.On call
//   - ctx context.Context
//   - address common.Address
//   - chainID *big.Int
func (_e *Eth_Expecter) CheckEnabled(ctx interface{}, address interface{}, chainID interface{}) *Eth_CheckEnabled_Call {
	return &Eth_CheckEnabled_Call{Call: _e.mock.On("CheckEnabled", ctx, address, chainID)}
}

func (_c *Eth_CheckEnabled_Call) Run(run func(ctx context.Context, address common.Address, chainID *big.Int)) *Eth_CheckEnabled_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(common.Address), args[2].(*big.Int))
	})
	return _c
}

func (_c *Eth_CheckEnabled_Call) Return(_a0 error) *Eth_CheckEnabled_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Eth_CheckEnabled_Call) RunAndReturn(run func(context.Context, common.Address, *big.Int) error) *Eth_CheckEnabled_Call {
	_c.Call.Return(run)
	return _c
}

// Create provides a mock function with given fields: ctx, chainIDs
func (_m *Eth) Create(ctx context.Context, chainIDs ...*big.Int) (ethkey.KeyV2, error) {
	_va := make([]interface{}, len(chainIDs))
	for _i := range chainIDs {
		_va[_i] = chainIDs[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for Create")
	}

	var r0 ethkey.KeyV2
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, ...*big.Int) (ethkey.KeyV2, error)); ok {
		return rf(ctx, chainIDs...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, ...*big.Int) ethkey.KeyV2); ok {
		r0 = rf(ctx, chainIDs...)
	} else {
		r0 = ret.Get(0).(ethkey.KeyV2)
	}

	if rf, ok := ret.Get(1).(func(context.Context, ...*big.Int) error); ok {
		r1 = rf(ctx, chainIDs...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_Create_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Create'
type Eth_Create_Call struct {
	*mock.Call
}

// Create is a helper method to define mock.On call
//   - ctx context.Context
//   - chainIDs ...*big.Int
func (_e *Eth_Expecter) Create(ctx interface{}, chainIDs ...interface{}) *Eth_Create_Call {
	return &Eth_Create_Call{Call: _e.mock.On("Create",
		append([]interface{}{ctx}, chainIDs...)...)}
}

func (_c *Eth_Create_Call) Run(run func(ctx context.Context, chainIDs ...*big.Int)) *Eth_Create_Call {
	_c.Call.Run(func(args mock.Arguments) {
		variadicArgs := make([]*big.Int, len(args)-1)
		for i, a := range args[1:] {
			if a != nil {
				variadicArgs[i] = a.(*big.Int)
			}
		}
		run(args[0].(context.Context), variadicArgs...)
	})
	return _c
}

func (_c *Eth_Create_Call) Return(_a0 ethkey.KeyV2, _a1 error) *Eth_Create_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_Create_Call) RunAndReturn(run func(context.Context, ...*big.Int) (ethkey.KeyV2, error)) *Eth_Create_Call {
	_c.Call.Return(run)
	return _c
}

// Delete provides a mock function with given fields: ctx, id
func (_m *Eth) Delete(ctx context.Context, id string) (ethkey.KeyV2, error) {
	ret := _m.Called(ctx, id)

	if len(ret) == 0 {
		panic("no return value specified for Delete")
	}

	var r0 ethkey.KeyV2
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (ethkey.KeyV2, error)); ok {
		return rf(ctx, id)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) ethkey.KeyV2); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Get(0).(ethkey.KeyV2)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_Delete_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Delete'
type Eth_Delete_Call struct {
	*mock.Call
}

// Delete is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
func (_e *Eth_Expecter) Delete(ctx interface{}, id interface{}) *Eth_Delete_Call {
	return &Eth_Delete_Call{Call: _e.mock.On("Delete", ctx, id)}
}

func (_c *Eth_Delete_Call) Run(run func(ctx context.Context, id string)) *Eth_Delete_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string))
	})
	return _c
}

func (_c *Eth_Delete_Call) Return(_a0 ethkey.KeyV2, _a1 error) *Eth_Delete_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_Delete_Call) RunAndReturn(run func(context.Context, string) (ethkey.KeyV2, error)) *Eth_Delete_Call {
	_c.Call.Return(run)
	return _c
}

// Disable provides a mock function with given fields: ctx, address, chainID
func (_m *Eth) Disable(ctx context.Context, address common.Address, chainID *big.Int) error {
	ret := _m.Called(ctx, address, chainID)

	if len(ret) == 0 {
		panic("no return value specified for Disable")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, *big.Int) error); ok {
		r0 = rf(ctx, address, chainID)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Eth_Disable_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Disable'
type Eth_Disable_Call struct {
	*mock.Call
}

// Disable is a helper method to define mock.On call
//   - ctx context.Context
//   - address common.Address
//   - chainID *big.Int
func (_e *Eth_Expecter) Disable(ctx interface{}, address interface{}, chainID interface{}) *Eth_Disable_Call {
	return &Eth_Disable_Call{Call: _e.mock.On("Disable", ctx, address, chainID)}
}

func (_c *Eth_Disable_Call) Run(run func(ctx context.Context, address common.Address, chainID *big.Int)) *Eth_Disable_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(common.Address), args[2].(*big.Int))
	})
	return _c
}

func (_c *Eth_Disable_Call) Return(_a0 error) *Eth_Disable_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Eth_Disable_Call) RunAndReturn(run func(context.Context, common.Address, *big.Int) error) *Eth_Disable_Call {
	_c.Call.Return(run)
	return _c
}

// Enable provides a mock function with given fields: ctx, address, chainID
func (_m *Eth) Enable(ctx context.Context, address common.Address, chainID *big.Int) error {
	ret := _m.Called(ctx, address, chainID)

	if len(ret) == 0 {
		panic("no return value specified for Enable")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, *big.Int) error); ok {
		r0 = rf(ctx, address, chainID)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Eth_Enable_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Enable'
type Eth_Enable_Call struct {
	*mock.Call
}

// Enable is a helper method to define mock.On call
//   - ctx context.Context
//   - address common.Address
//   - chainID *big.Int
func (_e *Eth_Expecter) Enable(ctx interface{}, address interface{}, chainID interface{}) *Eth_Enable_Call {
	return &Eth_Enable_Call{Call: _e.mock.On("Enable", ctx, address, chainID)}
}

func (_c *Eth_Enable_Call) Run(run func(ctx context.Context, address common.Address, chainID *big.Int)) *Eth_Enable_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(common.Address), args[2].(*big.Int))
	})
	return _c
}

func (_c *Eth_Enable_Call) Return(_a0 error) *Eth_Enable_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Eth_Enable_Call) RunAndReturn(run func(context.Context, common.Address, *big.Int) error) *Eth_Enable_Call {
	_c.Call.Return(run)
	return _c
}

// EnabledAddressesForChain provides a mock function with given fields: ctx, chainID
func (_m *Eth) EnabledAddressesForChain(ctx context.Context, chainID *big.Int) ([]common.Address, error) {
	ret := _m.Called(ctx, chainID)

	if len(ret) == 0 {
		panic("no return value specified for EnabledAddressesForChain")
	}

	var r0 []common.Address
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) ([]common.Address, error)); ok {
		return rf(ctx, chainID)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) []common.Address); ok {
		r0 = rf(ctx, chainID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]common.Address)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *big.Int) error); ok {
		r1 = rf(ctx, chainID)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_EnabledAddressesForChain_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'EnabledAddressesForChain'
type Eth_EnabledAddressesForChain_Call struct {
	*mock.Call
}

// EnabledAddressesForChain is a helper method to define mock.On call
//   - ctx context.Context
//   - chainID *big.Int
func (_e *Eth_Expecter) EnabledAddressesForChain(ctx interface{}, chainID interface{}) *Eth_EnabledAddressesForChain_Call {
	return &Eth_EnabledAddressesForChain_Call{Call: _e.mock.On("EnabledAddressesForChain", ctx, chainID)}
}

func (_c *Eth_EnabledAddressesForChain_Call) Run(run func(ctx context.Context, chainID *big.Int)) *Eth_EnabledAddressesForChain_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(*big.Int))
	})
	return _c
}

func (_c *Eth_EnabledAddressesForChain_Call) Return(addresses []common.Address, err error) *Eth_EnabledAddressesForChain_Call {
	_c.Call.Return(addresses, err)
	return _c
}

func (_c *Eth_EnabledAddressesForChain_Call) RunAndReturn(run func(context.Context, *big.Int) ([]common.Address, error)) *Eth_EnabledAddressesForChain_Call {
	_c.Call.Return(run)
	return _c
}

// EnabledKeysForChain provides a mock function with given fields: ctx, chainID
func (_m *Eth) EnabledKeysForChain(ctx context.Context, chainID *big.Int) ([]ethkey.KeyV2, error) {
	ret := _m.Called(ctx, chainID)

	if len(ret) == 0 {
		panic("no return value specified for EnabledKeysForChain")
	}

	var r0 []ethkey.KeyV2
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) ([]ethkey.KeyV2, error)); ok {
		return rf(ctx, chainID)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) []ethkey.KeyV2); ok {
		r0 = rf(ctx, chainID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]ethkey.KeyV2)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *big.Int) error); ok {
		r1 = rf(ctx, chainID)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_EnabledKeysForChain_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'EnabledKeysForChain'
type Eth_EnabledKeysForChain_Call struct {
	*mock.Call
}

// EnabledKeysForChain is a helper method to define mock.On call
//   - ctx context.Context
//   - chainID *big.Int
func (_e *Eth_Expecter) EnabledKeysForChain(ctx interface{}, chainID interface{}) *Eth_EnabledKeysForChain_Call {
	return &Eth_EnabledKeysForChain_Call{Call: _e.mock.On("EnabledKeysForChain", ctx, chainID)}
}

func (_c *Eth_EnabledKeysForChain_Call) Run(run func(ctx context.Context, chainID *big.Int)) *Eth_EnabledKeysForChain_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(*big.Int))
	})
	return _c
}

func (_c *Eth_EnabledKeysForChain_Call) Return(keys []ethkey.KeyV2, err error) *Eth_EnabledKeysForChain_Call {
	_c.Call.Return(keys, err)
	return _c
}

func (_c *Eth_EnabledKeysForChain_Call) RunAndReturn(run func(context.Context, *big.Int) ([]ethkey.KeyV2, error)) *Eth_EnabledKeysForChain_Call {
	_c.Call.Return(run)
	return _c
}

// EnsureKeys provides a mock function with given fields: ctx, chainIDs
func (_m *Eth) EnsureKeys(ctx context.Context, chainIDs ...*big.Int) error {
	_va := make([]interface{}, len(chainIDs))
	for _i := range chainIDs {
		_va[_i] = chainIDs[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for EnsureKeys")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, ...*big.Int) error); ok {
		r0 = rf(ctx, chainIDs...)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Eth_EnsureKeys_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'EnsureKeys'
type Eth_EnsureKeys_Call struct {
	*mock.Call
}

// EnsureKeys is a helper method to define mock.On call
//   - ctx context.Context
//   - chainIDs ...*big.Int
func (_e *Eth_Expecter) EnsureKeys(ctx interface{}, chainIDs ...interface{}) *Eth_EnsureKeys_Call {
	return &Eth_EnsureKeys_Call{Call: _e.mock.On("EnsureKeys",
		append([]interface{}{ctx}, chainIDs...)...)}
}

func (_c *Eth_EnsureKeys_Call) Run(run func(ctx context.Context, chainIDs ...*big.Int)) *Eth_EnsureKeys_Call {
	_c.Call.Run(func(args mock.Arguments) {
		variadicArgs := make([]*big.Int, len(args)-1)
		for i, a := range args[1:] {
			if a != nil {
				variadicArgs[i] = a.(*big.Int)
			}
		}
		run(args[0].(context.Context), variadicArgs...)
	})
	return _c
}

func (_c *Eth_EnsureKeys_Call) Return(_a0 error) *Eth_EnsureKeys_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *Eth_EnsureKeys_Call) RunAndReturn(run func(context.Context, ...*big.Int) error) *Eth_EnsureKeys_Call {
	_c.Call.Return(run)
	return _c
}

// Export provides a mock function with given fields: ctx, id, password
func (_m *Eth) Export(ctx context.Context, id string, password string) ([]byte, error) {
	ret := _m.Called(ctx, id, password)

	if len(ret) == 0 {
		panic("no return value specified for Export")
	}

	var r0 []byte
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string, string) ([]byte, error)); ok {
		return rf(ctx, id, password)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string, string) []byte); ok {
		r0 = rf(ctx, id, password)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]byte)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, string, string) error); ok {
		r1 = rf(ctx, id, password)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_Export_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Export'
type Eth_Export_Call struct {
	*mock.Call
}

// Export is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
//   - password string
func (_e *Eth_Expecter) Export(ctx interface{}, id interface{}, password interface{}) *Eth_Export_Call {
	return &Eth_Export_Call{Call: _e.mock.On("Export", ctx, id, password)}
}

func (_c *Eth_Export_Call) Run(run func(ctx context.Context, id string, password string)) *Eth_Export_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string), args[2].(string))
	})
	return _c
}

func (_c *Eth_Export_Call) Return(_a0 []byte, _a1 error) *Eth_Export_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_Export_Call) RunAndReturn(run func(context.Context, string, string) ([]byte, error)) *Eth_Export_Call {
	_c.Call.Return(run)
	return _c
}

// Get provides a mock function with given fields: ctx, id
func (_m *Eth) Get(ctx context.Context, id string) (ethkey.KeyV2, error) {
	ret := _m.Called(ctx, id)

	if len(ret) == 0 {
		panic("no return value specified for Get")
	}

	var r0 ethkey.KeyV2
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (ethkey.KeyV2, error)); ok {
		return rf(ctx, id)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) ethkey.KeyV2); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Get(0).(ethkey.KeyV2)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_Get_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Get'
type Eth_Get_Call struct {
	*mock.Call
}

// Get is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
func (_e *Eth_Expecter) Get(ctx interface{}, id interface{}) *Eth_Get_Call {
	return &Eth_Get_Call{Call: _e.mock.On("Get", ctx, id)}
}

func (_c *Eth_Get_Call) Run(run func(ctx context.Context, id string)) *Eth_Get_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string))
	})
	return _c
}

func (_c *Eth_Get_Call) Return(_a0 ethkey.KeyV2, _a1 error) *Eth_Get_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_Get_Call) RunAndReturn(run func(context.Context, string) (ethkey.KeyV2, error)) *Eth_Get_Call {
	_c.Call.Return(run)
	return _c
}

// GetAll provides a mock function with given fields: ctx
func (_m *Eth) GetAll(ctx context.Context) ([]ethkey.KeyV2, error) {
	ret := _m.Called(ctx)

	if len(ret) == 0 {
		panic("no return value specified for GetAll")
	}

	var r0 []ethkey.KeyV2
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context) ([]ethkey.KeyV2, error)); ok {
		return rf(ctx)
	}
	if rf, ok := ret.Get(0).(func(context.Context) []ethkey.KeyV2); ok {
		r0 = rf(ctx)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]ethkey.KeyV2)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context) error); ok {
		r1 = rf(ctx)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_GetAll_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetAll'
type Eth_GetAll_Call struct {
	*mock.Call
}

// GetAll is a helper method to define mock.On call
//   - ctx context.Context
func (_e *Eth_Expecter) GetAll(ctx interface{}) *Eth_GetAll_Call {
	return &Eth_GetAll_Call{Call: _e.mock.On("GetAll", ctx)}
}

func (_c *Eth_GetAll_Call) Run(run func(ctx context.Context)) *Eth_GetAll_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context))
	})
	return _c
}

func (_c *Eth_GetAll_Call) Return(_a0 []ethkey.KeyV2, _a1 error) *Eth_GetAll_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_GetAll_Call) RunAndReturn(run func(context.Context) ([]ethkey.KeyV2, error)) *Eth_GetAll_Call {
	_c.Call.Return(run)
	return _c
}

// GetRoundRobinAddress provides a mock function with given fields: ctx, chainID, addresses
func (_m *Eth) GetRoundRobinAddress(ctx context.Context, chainID *big.Int, addresses ...common.Address) (common.Address, error) {
	_va := make([]interface{}, len(addresses))
	for _i := range addresses {
		_va[_i] = addresses[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, chainID)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for GetRoundRobinAddress")
	}

	var r0 common.Address
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int, ...common.Address) (common.Address, error)); ok {
		return rf(ctx, chainID, addresses...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int, ...common.Address) common.Address); ok {
		r0 = rf(ctx, chainID, addresses...)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(common.Address)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *big.Int, ...common.Address) error); ok {
		r1 = rf(ctx, chainID, addresses...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_GetRoundRobinAddress_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetRoundRobinAddress'
type Eth_GetRoundRobinAddress_Call struct {
	*mock.Call
}

// GetRoundRobinAddress is a helper method to define mock.On call
//   - ctx context.Context
//   - chainID *big.Int
//   - addresses ...common.Address
func (_e *Eth_Expecter) GetRoundRobinAddress(ctx interface{}, chainID interface{}, addresses ...interface{}) *Eth_GetRoundRobinAddress_Call {
	return &Eth_GetRoundRobinAddress_Call{Call: _e.mock.On("GetRoundRobinAddress",
		append([]interface{}{ctx, chainID}, addresses...)...)}
}

func (_c *Eth_GetRoundRobinAddress_Call) Run(run func(ctx context.Context, chainID *big.Int, addresses ...common.Address)) *Eth_GetRoundRobinAddress_Call {
	_c.Call.Run(func(args mock.Arguments) {
		variadicArgs := make([]common.Address, len(args)-2)
		for i, a := range args[2:] {
			if a != nil {
				variadicArgs[i] = a.(common.Address)
			}
		}
		run(args[0].(context.Context), args[1].(*big.Int), variadicArgs...)
	})
	return _c
}

func (_c *Eth_GetRoundRobinAddress_Call) Return(address common.Address, err error) *Eth_GetRoundRobinAddress_Call {
	_c.Call.Return(address, err)
	return _c
}

func (_c *Eth_GetRoundRobinAddress_Call) RunAndReturn(run func(context.Context, *big.Int, ...common.Address) (common.Address, error)) *Eth_GetRoundRobinAddress_Call {
	_c.Call.Return(run)
	return _c
}

// GetState provides a mock function with given fields: ctx, id, chainID
func (_m *Eth) GetState(ctx context.Context, id string, chainID *big.Int) (ethkey.State, error) {
	ret := _m.Called(ctx, id, chainID)

	if len(ret) == 0 {
		panic("no return value specified for GetState")
	}

	var r0 ethkey.State
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string, *big.Int) (ethkey.State, error)); ok {
		return rf(ctx, id, chainID)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string, *big.Int) ethkey.State); ok {
		r0 = rf(ctx, id, chainID)
	} else {
		r0 = ret.Get(0).(ethkey.State)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string, *big.Int) error); ok {
		r1 = rf(ctx, id, chainID)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_GetState_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetState'
type Eth_GetState_Call struct {
	*mock.Call
}

// GetState is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
//   - chainID *big.Int
func (_e *Eth_Expecter) GetState(ctx interface{}, id interface{}, chainID interface{}) *Eth_GetState_Call {
	return &Eth_GetState_Call{Call: _e.mock.On("GetState", ctx, id, chainID)}
}

func (_c *Eth_GetState_Call) Run(run func(ctx context.Context, id string, chainID *big.Int)) *Eth_GetState_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string), args[2].(*big.Int))
	})
	return _c
}

func (_c *Eth_GetState_Call) Return(_a0 ethkey.State, _a1 error) *Eth_GetState_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_GetState_Call) RunAndReturn(run func(context.Context, string, *big.Int) (ethkey.State, error)) *Eth_GetState_Call {
	_c.Call.Return(run)
	return _c
}

// GetStateForKey provides a mock function with given fields: ctx, key
func (_m *Eth) GetStateForKey(ctx context.Context, key ethkey.KeyV2) (ethkey.State, error) {
	ret := _m.Called(ctx, key)

	if len(ret) == 0 {
		panic("no return value specified for GetStateForKey")
	}

	var r0 ethkey.State
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, ethkey.KeyV2) (ethkey.State, error)); ok {
		return rf(ctx, key)
	}
	if rf, ok := ret.Get(0).(func(context.Context, ethkey.KeyV2) ethkey.State); ok {
		r0 = rf(ctx, key)
	} else {
		r0 = ret.Get(0).(ethkey.State)
	}

	if rf, ok := ret.Get(1).(func(context.Context, ethkey.KeyV2) error); ok {
		r1 = rf(ctx, key)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_GetStateForKey_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetStateForKey'
type Eth_GetStateForKey_Call struct {
	*mock.Call
}

// GetStateForKey is a helper method to define mock.On call
//   - ctx context.Context
//   - key ethkey.KeyV2
func (_e *Eth_Expecter) GetStateForKey(ctx interface{}, key interface{}) *Eth_GetStateForKey_Call {
	return &Eth_GetStateForKey_Call{Call: _e.mock.On("GetStateForKey", ctx, key)}
}

func (_c *Eth_GetStateForKey_Call) Run(run func(ctx context.Context, key ethkey.KeyV2)) *Eth_GetStateForKey_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(ethkey.KeyV2))
	})
	return _c
}

func (_c *Eth_GetStateForKey_Call) Return(_a0 ethkey.State, _a1 error) *Eth_GetStateForKey_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_GetStateForKey_Call) RunAndReturn(run func(context.Context, ethkey.KeyV2) (ethkey.State, error)) *Eth_GetStateForKey_Call {
	_c.Call.Return(run)
	return _c
}

// GetStatesForChain provides a mock function with given fields: ctx, chainID
func (_m *Eth) GetStatesForChain(ctx context.Context, chainID *big.Int) ([]ethkey.State, error) {
	ret := _m.Called(ctx, chainID)

	if len(ret) == 0 {
		panic("no return value specified for GetStatesForChain")
	}

	var r0 []ethkey.State
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) ([]ethkey.State, error)); ok {
		return rf(ctx, chainID)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int) []ethkey.State); ok {
		r0 = rf(ctx, chainID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]ethkey.State)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *big.Int) error); ok {
		r1 = rf(ctx, chainID)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_GetStatesForChain_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetStatesForChain'
type Eth_GetStatesForChain_Call struct {
	*mock.Call
}

// GetStatesForChain is a helper method to define mock.On call
//   - ctx context.Context
//   - chainID *big.Int
func (_e *Eth_Expecter) GetStatesForChain(ctx interface{}, chainID interface{}) *Eth_GetStatesForChain_Call {
	return &Eth_GetStatesForChain_Call{Call: _e.mock.On("GetStatesForChain", ctx, chainID)}
}

func (_c *Eth_GetStatesForChain_Call) Run(run func(ctx context.Context, chainID *big.Int)) *Eth_GetStatesForChain_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(*big.Int))
	})
	return _c
}

func (_c *Eth_GetStatesForChain_Call) Return(_a0 []ethkey.State, _a1 error) *Eth_GetStatesForChain_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_GetStatesForChain_Call) RunAndReturn(run func(context.Context, *big.Int) ([]ethkey.State, error)) *Eth_GetStatesForChain_Call {
	_c.Call.Return(run)
	return _c
}

// GetStatesForKeys provides a mock function with given fields: ctx, keys
func (_m *Eth) GetStatesForKeys(ctx context.Context, keys []ethkey.KeyV2) ([]ethkey.State, error) {
	ret := _m.Called(ctx, keys)

	if len(ret) == 0 {
		panic("no return value specified for GetStatesForKeys")
	}

	var r0 []ethkey.State
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, []ethkey.KeyV2) ([]ethkey.State, error)); ok {
		return rf(ctx, keys)
	}
	if rf, ok := ret.Get(0).(func(context.Context, []ethkey.KeyV2) []ethkey.State); ok {
		r0 = rf(ctx, keys)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]ethkey.State)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, []ethkey.KeyV2) error); ok {
		r1 = rf(ctx, keys)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_GetStatesForKeys_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetStatesForKeys'
type Eth_GetStatesForKeys_Call struct {
	*mock.Call
}

// GetStatesForKeys is a helper method to define mock.On call
//   - ctx context.Context
//   - keys []ethkey.KeyV2
func (_e *Eth_Expecter) GetStatesForKeys(ctx interface{}, keys interface{}) *Eth_GetStatesForKeys_Call {
	return &Eth_GetStatesForKeys_Call{Call: _e.mock.On("GetStatesForKeys", ctx, keys)}
}

func (_c *Eth_GetStatesForKeys_Call) Run(run func(ctx context.Context, keys []ethkey.KeyV2)) *Eth_GetStatesForKeys_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].([]ethkey.KeyV2))
	})
	return _c
}

func (_c *Eth_GetStatesForKeys_Call) Return(_a0 []ethkey.State, _a1 error) *Eth_GetStatesForKeys_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_GetStatesForKeys_Call) RunAndReturn(run func(context.Context, []ethkey.KeyV2) ([]ethkey.State, error)) *Eth_GetStatesForKeys_Call {
	_c.Call.Return(run)
	return _c
}

// Import provides a mock function with given fields: ctx, keyJSON, password, chainIDs
func (_m *Eth) Import(ctx context.Context, keyJSON []byte, password string, chainIDs ...*big.Int) (ethkey.KeyV2, error) {
	_va := make([]interface{}, len(chainIDs))
	for _i := range chainIDs {
		_va[_i] = chainIDs[_i]
	}
	var _ca []interface{}
	_ca = append(_ca, ctx, keyJSON, password)
	_ca = append(_ca, _va...)
	ret := _m.Called(_ca...)

	if len(ret) == 0 {
		panic("no return value specified for Import")
	}

	var r0 ethkey.KeyV2
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, []byte, string, ...*big.Int) (ethkey.KeyV2, error)); ok {
		return rf(ctx, keyJSON, password, chainIDs...)
	}
	if rf, ok := ret.Get(0).(func(context.Context, []byte, string, ...*big.Int) ethkey.KeyV2); ok {
		r0 = rf(ctx, keyJSON, password, chainIDs...)
	} else {
		r0 = ret.Get(0).(ethkey.KeyV2)
	}

	if rf, ok := ret.Get(1).(func(context.Context, []byte, string, ...*big.Int) error); ok {
		r1 = rf(ctx, keyJSON, password, chainIDs...)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_Import_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Import'
type Eth_Import_Call struct {
	*mock.Call
}

// Import is a helper method to define mock.On call
//   - ctx context.Context
//   - keyJSON []byte
//   - password string
//   - chainIDs ...*big.Int
func (_e *Eth_Expecter) Import(ctx interface{}, keyJSON interface{}, password interface{}, chainIDs ...interface{}) *Eth_Import_Call {
	return &Eth_Import_Call{Call: _e.mock.On("Import",
		append([]interface{}{ctx, keyJSON, password}, chainIDs...)...)}
}

func (_c *Eth_Import_Call) Run(run func(ctx context.Context, keyJSON []byte, password string, chainIDs ...*big.Int)) *Eth_Import_Call {
	_c.Call.Run(func(args mock.Arguments) {
		variadicArgs := make([]*big.Int, len(args)-3)
		for i, a := range args[3:] {
			if a != nil {
				variadicArgs[i] = a.(*big.Int)
			}
		}
		run(args[0].(context.Context), args[1].([]byte), args[2].(string), variadicArgs...)
	})
	return _c
}

func (_c *Eth_Import_Call) Return(_a0 ethkey.KeyV2, _a1 error) *Eth_Import_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_Import_Call) RunAndReturn(run func(context.Context, []byte, string, ...*big.Int) (ethkey.KeyV2, error)) *Eth_Import_Call {
	_c.Call.Return(run)
	return _c
}

// SignTx provides a mock function with given fields: ctx, fromAddress, tx, chainID
func (_m *Eth) SignTx(ctx context.Context, fromAddress common.Address, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error) {
	ret := _m.Called(ctx, fromAddress, tx, chainID)

	if len(ret) == 0 {
		panic("no return value specified for SignTx")
	}

	var r0 *types.Transaction
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, *types.Transaction, *big.Int) (*types.Transaction, error)); ok {
		return rf(ctx, fromAddress, tx, chainID)
	}
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, *types.Transaction, *big.Int) *types.Transaction); ok {
		r0 = rf(ctx, fromAddress, tx, chainID)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*types.Transaction)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, common.Address, *types.Transaction, *big.Int) error); ok {
		r1 = rf(ctx, fromAddress, tx, chainID)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Eth_SignTx_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'SignTx'
type Eth_SignTx_Call struct {
	*mock.Call
}

// SignTx is a helper method to define mock.On call
//   - ctx context.Context
//   - fromAddress common.Address
//   - tx *types.Transaction
//   - chainID *big.Int
func (_e *Eth_Expecter) SignTx(ctx interface{}, fromAddress interface{}, tx interface{}, chainID interface{}) *Eth_SignTx_Call {
	return &Eth_SignTx_Call{Call: _e.mock.On("SignTx", ctx, fromAddress, tx, chainID)}
}

func (_c *Eth_SignTx_Call) Run(run func(ctx context.Context, fromAddress common.Address, tx *types.Transaction, chainID *big.Int)) *Eth_SignTx_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(common.Address), args[2].(*types.Transaction), args[3].(*big.Int))
	})
	return _c
}

func (_c *Eth_SignTx_Call) Return(_a0 *types.Transaction, _a1 error) *Eth_SignTx_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *Eth_SignTx_Call) RunAndReturn(run func(context.Context, common.Address, *types.Transaction, *big.Int) (*types.Transaction, error)) *Eth_SignTx_Call {
	_c.Call.Return(run)
	return _c
}

// SubscribeToKeyChanges provides a mock function with given fields: ctx
func (_m *Eth) SubscribeToKeyChanges(ctx context.Context) (chan struct{}, func()) {
	ret := _m.Called(ctx)

	if len(ret) == 0 {
		panic("no return value specified for SubscribeToKeyChanges")
	}

	var r0 chan struct{}
	var r1 func()
	if rf, ok := ret.Get(0).(func(context.Context) (chan struct{}, func())); ok {
		return rf(ctx)
	}
	if rf, ok := ret.Get(0).(func(context.Context) chan struct{}); ok {
		r0 = rf(ctx)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(chan struct{})
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context) func()); ok {
		r1 = rf(ctx)
	} else {
		if ret.Get(1) != nil {
			r1 = ret.Get(1).(func())
		}
	}

	return r0, r1
}

// Eth_SubscribeToKeyChanges_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'SubscribeToKeyChanges'
type Eth_SubscribeToKeyChanges_Call struct {
	*mock.Call
}

// SubscribeToKeyChanges is a helper method to define mock.On call
//   - ctx context.Context
func (_e *Eth_Expecter) SubscribeToKeyChanges(ctx interface{}) *Eth_SubscribeToKeyChanges_Call {
	return &Eth_SubscribeToKeyChanges_Call{Call: _e.mock.On("SubscribeToKeyChanges", ctx)}
}

func (_c *Eth_SubscribeToKeyChanges_Call) Run(run func(ctx context.Context)) *Eth_SubscribeToKeyChanges_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context))
	})
	return _c
}

func (_c *Eth_SubscribeToKeyChanges_Call) Return(ch chan struct{}, unsub func()) *Eth_SubscribeToKeyChanges_Call {
	_c.Call.Return(ch, unsub)
	return _c
}

func (_c *Eth_SubscribeToKeyChanges_Call) RunAndReturn(run func(context.Context) (chan struct{}, func())) *Eth_SubscribeToKeyChanges_Call {
	_c.Call.Return(run)
	return _c
}

// XXXTestingOnlyAdd provides a mock function with given fields: ctx, key
func (_m *Eth) XXXTestingOnlyAdd(ctx context.Context, key ethkey.KeyV2) {
	_m.Called(ctx, key)
}

// Eth_XXXTestingOnlyAdd_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'XXXTestingOnlyAdd'
type Eth_XXXTestingOnlyAdd_Call struct {
	*mock.Call
}

// XXXTestingOnlyAdd is a helper method to define mock.On call
//   - ctx context.Context
//   - key ethkey.KeyV2
func (_e *Eth_Expecter) XXXTestingOnlyAdd(ctx interface{}, key interface{}) *Eth_XXXTestingOnlyAdd_Call {
	return &Eth_XXXTestingOnlyAdd_Call{Call: _e.mock.On("XXXTestingOnlyAdd", ctx, key)}
}

func (_c *Eth_XXXTestingOnlyAdd_Call) Run(run func(ctx context.Context, key ethkey.KeyV2)) *Eth_XXXTestingOnlyAdd_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(ethkey.KeyV2))
	})
	return _c
}

func (_c *Eth_XXXTestingOnlyAdd_Call) Return() *Eth_XXXTestingOnlyAdd_Call {
	_c.Call.Return()
	return _c
}

func (_c *Eth_XXXTestingOnlyAdd_Call) RunAndReturn(run func(context.Context, ethkey.KeyV2)) *Eth_XXXTestingOnlyAdd_Call {
	_c.Call.Return(run)
	return _c
}

// XXXTestingOnlySetState provides a mock function with given fields: ctx, keyState
func (_m *Eth) XXXTestingOnlySetState(ctx context.Context, keyState ethkey.State) {
	_m.Called(ctx, keyState)
}

// Eth_XXXTestingOnlySetState_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'XXXTestingOnlySetState'
type Eth_XXXTestingOnlySetState_Call struct {
	*mock.Call
}

// XXXTestingOnlySetState is a helper method to define mock.On call
//   - ctx context.Context
//   - keyState ethkey.State
func (_e *Eth_Expecter) XXXTestingOnlySetState(ctx interface{}, keyState interface{}) *Eth_XXXTestingOnlySetState_Call {
	return &Eth_XXXTestingOnlySetState_Call{Call: _e.mock.On("XXXTestingOnlySetState", ctx, keyState)}
}

func (_c *Eth_XXXTestingOnlySetState_Call) Run(run func(ctx context.Context, keyState ethkey.State)) *Eth_XXXTestingOnlySetState_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(ethkey.State))
	})
	return _c
}

func (_c *Eth_XXXTestingOnlySetState_Call) Return() *Eth_XXXTestingOnlySetState_Call {
	_c.Call.Return()
	return _c
}

func (_c *Eth_XXXTestingOnlySetState_Call) RunAndReturn(run func(context.Context, ethkey.State)) *Eth_XXXTestingOnlySetState_Call {
	_c.Call.Return(run)
	return _c
}

// NewEth creates a new instance of Eth. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewEth(t interface {
	mock.TestingT
	Cleanup(func())
}) *Eth {
	mock := &Eth{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
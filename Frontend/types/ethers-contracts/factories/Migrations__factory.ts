/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Migrations, MigrationsInterface } from "../Migrations";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "last_completed_migration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "completed",
        type: "uint256",
      },
    ],
    name: "setCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610242806100606000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063445df0ac146100465780638da5cb5b14610064578063fdacd57614610082575b600080fd5b61004e61009e565b60405161005b919061019e565b60405180910390f35b61006c6100a4565b6040516100799190610183565b60405180910390f35b61009c6004803603810190610097919061013c565b6100c8565b005b60015481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561012457806001819055505b50565b600081359050610136816101f5565b92915050565b60006020828403121561014e57600080fd5b600061015c84828501610127565b91505092915050565b61016e816101b9565b82525050565b61017d816101eb565b82525050565b60006020820190506101986000830184610165565b92915050565b60006020820190506101b36000830184610174565b92915050565b60006101c4826101cb565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6101fe816101eb565b811461020957600080fd5b5056fea2646970667358221220b8d9acb578cbcfed5a814315bc2e372c948fe23ba6b58690ce3a45d6480259ba64736f6c63430008000033";

type MigrationsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MigrationsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Migrations__factory extends ContractFactory {
  constructor(...args: MigrationsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Migrations> {
    return super.deploy(overrides || {}) as Promise<Migrations>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Migrations {
    return super.attach(address) as Migrations;
  }
  override connect(signer: Signer): Migrations__factory {
    return super.connect(signer) as Migrations__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MigrationsInterface {
    return new utils.Interface(_abi) as MigrationsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Migrations {
    return new Contract(address, _abi, signerOrProvider) as Migrations;
  }
}

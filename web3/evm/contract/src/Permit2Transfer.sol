// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

struct PermitDetails {
  address token;
  uint160 amount;
  uint48 expiration;
  uint48 nonce;
}

struct PermitSingle {
  PermitDetails details;
  address spender;
  uint256 sigDeadline;
}

struct TokenPermissions {
  address token;
  uint256 amount;
}

struct PermitTransferFrom {
  TokenPermissions permitted;
  uint256 nonce;
  uint256 deadline;
}

struct SignatureTransferDetails {
  address to;
  uint256 requestedAmount;
}

interface IPermit2 {
  function permit(
    address owner,
    PermitSingle calldata permitSingle,
    bytes calldata signature
  ) external;

  function transferFrom(address from, address to, uint160 amount, address token) external;

  function permitTransferFrom(
    PermitTransferFrom calldata permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes calldata signature
  ) external;
}

contract Permit2Transfer {
  address public constant PERMIT2_ADDR = 0x000000000022D473030F116dDEE9F6B43aC78BA3;

  IPermit2 public immutable PERMIT2 = IPermit2(PERMIT2_ADDR);

  // ------------------------------
  // AllowanceTransfer (PermitSingle)
  // ------------------------------
  function allowanceTransfer(
    PermitSingle calldata permitSingle,
    bytes calldata signature,
    address receiver
  ) external {
    // 更新授权
    PERMIT2.permit(msg.sender, permitSingle, signature);

    // 执行转账
    PERMIT2.transferFrom(
      msg.sender,
      receiver,
      permitSingle.details.amount,
      permitSingle.details.token
    );
  }

  // ------------------------------
  // SignatureTransfer
  // ------------------------------
  function signatureTransfer(
    PermitTransferFrom calldata permit,
    SignatureTransferDetails calldata transferDetails,
    bytes calldata signature
  ) external {
    PERMIT2.permitTransferFrom(permit, transferDetails, msg.sender, signature);
  }
}

var Account = require('../../lib/account');
var assert  = require('assert');

require('should');

describe('Account', function() {

	describe('#balance', function() {
		it('should have 0 balance', function() {
			var account = Account.create();
			account.should.have.property('balance');
			account.balance.should.eql(0);
		});
	});

	describe('#credit()', function() {
		it('should increase the balance after credit', function() {
			var account = Account.create();
			account.credit(10);
			account.balance.should.eql(10);
		});
	});

	describe('#debit()', function() {
		it('should decrease the balance after debit', function() {
			var account = Account.create();
			account.debit(10);
			account.balance.should.eql(-10);
		});
	});

	describe('#transferTo()', function() {
		it('should credit one account and debit the other on transfer', function() {
			var accountA = Account.create();
			accountA.credit(20);
			var accountB = Account.create();
			accountA.transferTo(accountB, 5);
			accountA.balance.should.eql(15);
			accountB.balance.should.eql(5);
		});
	});

	describe('#transferTo()', function() {
		it('should throw error if not enough funds', function() {
			var accountA = Account.create();
			accountA.credit(5);
			var accountB = Account.create();
			assert.throws(function() {
				accountA.transferTo(accountB, 10);
			});
		});
	});

});

